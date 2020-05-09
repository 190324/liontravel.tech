package middlewares

import (
	"context"
	"liontravel.tech/internal/app/models"
	status2 "liontravel.tech/internal/pkg/status"
	"log"
	"net/http"
	"strings"
)

type contextKey struct {
	name string
}
var ctxKey = &contextKey{"ctxKey"}


func TokenFromHeader(r *http.Request) string {
	// Get token from authorization header.
	bearer := r.Header.Get("Authorization")
	if len(bearer) > 7 && strings.ToUpper(bearer[0:6]) == "BEARER" {
		return bearer[7:]
	}
	return ""
}

// Middleware decodes the share session cookie and packs the session into context
func Auth() func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			c := TokenFromHeader(r)
			log.Printf("%v %v", r.URL, r.Header)
			// Allow unauthenticated users in
			if c == "" {
				next.ServeHTTP(w, r)
				return
			}

			oUser := &models.User{}
			claims, status := oUser.AuthCheck(c)

			if status != 200 {
				next.ServeHTTP(w, r)
				return
			}

			oUser.FindByNo(claims.No)
			ctxValue := map[string]interface{}{
				"user": oUser,
				"status": status,
			}

			// put it in context
			ctx := context.WithValue(r.Context(), ctxKey, ctxValue)
			//ctxStatus := context.WithValue(r.Context(), authStatusKey, status)


			// and call the next with our new context
			r = r.WithContext(ctx)
			//r = r.WithContext(ctxStatus)


			next.ServeHTTP(w, r)
		})
	}
}

// ForContext finds the user from the context. REQUIRES Middleware to have run.
func GetUser(ctx context.Context) *models.User {
	raw := ctx.Value(ctxKey)
	rawConvert, isValid := raw.(map[string]interface{})
	var oUser *models.User

	if isValid {
		oUser = rawConvert["user"].(*models.User)
	}

	return oUser
}

func GetAuthStatus(ctx context.Context) int {
	raw := ctx.Value(ctxKey)
	rawConvert, isValid := raw.(map[string]interface{})
	status := status2.Unauthorized

	if isValid {
		status = rawConvert["status"].(int)
	}

	return status
}