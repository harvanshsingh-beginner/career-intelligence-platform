import mysql.connector


try:

    connection = mysql.connector.connect(
        host="localhost",
        user="root",
        password="123456",
        database="career_intelligence"
    )

    cursor = connection.cursor()

    print("Database Connected")

except Exception as e:

    print("Database Error:", e)

    connection = None
    cursor = None