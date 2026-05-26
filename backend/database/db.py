import mysql.connector


connection = mysql.connector.connect(
    host="localhost",
    user="root",
    password="123456",
    database="career_intelligence"
)

cursor = connection.cursor()