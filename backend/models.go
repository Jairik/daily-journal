/* Database models */

package main

import (
	"time"
	"gorm.io/gorm"
)

// JournalQuestionKind selects which answer field is used for a prompt.
type JournalQuestionKind string
const (
	QuestionKindNumeric JournalQuestionKind = "numeric" // scale-answer
	QuestionKindBool    JournalQuestionKind = "bool"
	QuestionKindText    JournalQuestionKind = "text"
)

// JournalQuestion is one string prompt plus a typed answer.
type JournalQuestion struct {
	Prompt  string              `json:"prompt"`
	Kind    JournalQuestionKind `json:"kind"`
	Numeric *int                `json:"numeric,omitempty"` // 0–5 when kind is numeric
	Bool    *bool               `json:"bool,omitempty"`
	Text    string              `json:"text,omitempty"`
}

// User preferences for question building
type UserProfile struct {
	
}

// User model
type User struct {
	ID        uint           `gorm:"primaryKey" json:"id"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	Username  string         `gorm:"uniqueIndex;not null" json:"username"`
	Email     string         `gorm:"uniqueIndex;not null" json:"email"`
	Journals  []Journal      `gorm:"foreignKey:UserID" json:"-"`
}

// Journal holds a title and a 2D grid of questions: outer slice is e.g. one
// “page” or day; each inner slice is a fixed-length set of prompts for that page.
type Journal struct {
	ID        uint                `gorm:"primaryKey" json:"id"`
	CreatedAt time.Time           `json:"created_at"`
	UpdatedAt time.Time           `json:"updated_at"`
	UserID    uint                `gorm:"index;not null" json:"user_id"`
	Title     string              `json:"title, omitempty"`  // Optional title users can give each day
	Rows      [][]JournalQuestion `gorm:"serializer:json" json:"rows"`
}


