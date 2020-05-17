package models

import (
    "fmt"
    "github.com/dgrijalva/jwt-go"
    "github.com/spf13/viper"
    "liontravel.tech/config"
    "liontravel.tech/internal/pkg/encrypt"
    _ "liontravel.tech/internal/pkg/env"
    "strconv"
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
    No string `json:"no"`
    Name *string `json:"name"`
    jwt.StandardClaims
}

func (m *User) BeforeCreate() (err error) {
    t := time.Now()
    year, _ := strconv.Atoi(t.Format("2006"))
    diffYear := year - 1911
    middle := fmt.Sprintf("%v%v",diffYear, t.Format("0102"))
    m.No = GenerateNo("U", middle, 5)

    if m.Password != nil {
        hash := m.HashPassword(*m.Password)
        m.Password = &hash
    }

    return
}

func (m *User) HashPassword(pass string) string{
    hash := encrypt.Bcrypt(pass)
    return hash
}

func (m *User) UpdatePassword()  {
    hash := m.HashPassword(*m.Password)
    m.Password = &hash
    Save(m)
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

    var expiresMinute time.Duration = 60

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

    status := encrypt.CheckRS256Token(publicPath, token, claims)

    return claims, status
}
