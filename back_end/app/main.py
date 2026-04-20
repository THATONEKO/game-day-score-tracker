from fastapi import FastAPI
from pydantic import BaseModel 
from fastapi.middleware.cors import CORSMiddleware
from fastapi import HTTPException
import mysql.connector 
app = FastAPI()

app.add_middleware(
   CORSMiddleware,
   allow_origins = [
    "http://192.168.0.160:3000",
    "http://127.0.0.1:3000",
    "http://192.168.43.60:3000",  
    "http://localhost:3000",  
   ]
   ,
   allow_credentials = True,
   allow_methods=["*"],
   allow_headers=["*"],
)

db = mysql.connector.connect(
    host="localhost",
    user="root",
    password= "ilovepanthers7850",
    database="users"
)

cursor = db.cursor()

class Login(BaseModel):
    email : str
    password : str

class create_users(BaseModel):
  name: str
  surname: str
  email: str
  grade: str
  password: str 

admin_email = {
    "bm@machcoll.co.ls" :
    "machcoll.me"
}

@app.post("/api/auth/login") 
def admin_login(login_info:Login):
     if login_info.email in admin_email and admin_email[login_info.email]== login_info.password:
      Admin_Id = 1
      return {"message":"admin login successfull", "role": "admin","adminId": Admin_Id}
     else:
        raise HTTPException(status_code=401, detail= "invalid admin credentials")

@app.post("/api/auth/login-secondary")
def secondary_login(login_info: Login):

    sql = "SELECT * FROM secondary_emails WHERE email = %s AND password = %s"
    values = (login_info.email, login_info.password)

    cursor.execute(sql, values)
    users = cursor.fetchone()
    if users:
        return {
            "message": "login successful",
            "role": "secondary user",
            "userId": users[0] 
        }

    raise HTTPException(status_code=401, detail="invalid credentials")

      
@app.post("/api/users")
def create_user(user: create_users):

    sql = """
    INSERT INTO secondary_emails (name, surname, email, password, grade)
    VALUES (%s, %s, %s, %s, %s)
    """

    values = (user.name, user.surname, user.email, user.password, user.grade)

    cursor.execute(sql, values)
    db.commit()

    return {
        "message": "User saved",
        "id": cursor.lastrowid,
        "name": user.name,
        "surname": user.surname,
        "email": user.email,
        "password":user.password,
        "grade": user.grade }
