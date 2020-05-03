package models

import (
    "github.com/dgrijalva/jwt-go"
    "github.com/spf13/viper"
    "liontravel.tech/config"
    "liontravel.tech/internal/pkg/encrypt"
    _ "liontravel.tech/internal/pkg/env"
    "time"
)

type AuthToken struct {
    AccessToken  string
    RefreshToken string
    TokenType    string
    Expires      int
}

type User struct {
    ID        int        `json:"id"`
    No        string     `json:"no"`
    Name      string     `json:"name"`
    Email     *string    `json:"email"`
    Password  *string    `json:"password,omitempty"`
    CreatedAt time.Time  `json:"created_at"`
    UpdatedAt time.Time  `json:"updated_at"`
    DeletedAt *time.Time `json:"deleted_at"`
}

type UserClaims struct {
    No string
    Name *string
    jwt.StandardClaims
}

func (m *User) Save() {
    db, _ := config.NewDB()

    originPassword := m.Password

    _db := db.FirstOrInit(m, User{
        No:        m.No,
    })

    if originPassword != nil {
        hash := encrypt.Bcrypt(*originPassword)
        m.Password = &hash
    }

    _db.Save(m)
}

func (m *User) Check() bool{
    db, _ := config.NewDB()

    comparePassword := *m.Password

    db.FirstOrInit(m, User{
        Email:    m.Email,
    })

    isValid := false

    if m.ID > 0{
        isValid = encrypt.BcryptCheck(*m.Password, comparePassword)
    }

    return isValid
}

func (m *User) AuthToken() *AuthToken{

    var expiresMinute time.Duration = 1

    accessClaims := &UserClaims{
        No: m.No,
        Name: &m.Name,
        StandardClaims: jwt.StandardClaims{
            ExpiresAt: time.Now().Add( expiresMinute * time.Minute ).Unix(),
        },
    }
    privateKeyPath := viper.GetString("auth.user.keyPath.access.private")
    accessToken := encrypt.GenerateRS256Token(privateKeyPath, accessClaims)

    refreshClaims := &UserClaims{
        No: m.No,
        StandardClaims: jwt.StandardClaims{
            ExpiresAt: time.Now().Add( 2 * expiresMinute * time.Minute ).Unix(),
        },
    }
    privateKeyPathForRefresh := viper.GetString("auth.user.keyPath.refresh.private")
    refreshToken := encrypt.GenerateRS256Token(privateKeyPathForRefresh, refreshClaims)

    return &AuthToken{
        AccessToken: accessToken,
        RefreshToken: refreshToken,
        TokenType: "bearer",
        Expires: int((expiresMinute * time.Minute).Seconds()),
    }
}

func (m *User) AuthCheck(token string) (*UserClaims, int)  {
    publicPath := viper.GetString("auth.user.keyPath.access.public")
    claims := &UserClaims{}

    result := encrypt.CheckRS256Token(publicPath, token, claims)

    return claims, result
}
