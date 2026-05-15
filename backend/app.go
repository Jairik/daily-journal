/* API endpoints and whatnot */

import "github.com/gin-gonic/gin"

// Initialize the Gin mode
func init() {
	gin.SetMode(os.Getenv("GIN_MODE"))
}

// Start the server
func main() {
	router := gin.Default()
	router.Run(":8080")
}

// Developer simple test endpoint
func getHello(c *gin.Context) {
	c.JSON(200, gin.H{
		"message": "Hello, World!",
	})
}

