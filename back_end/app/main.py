from fastapi import FastAPI
from pydantic import BaseModel 
from fastapi.middleware.cors import CORSMiddleware
from fastapi import HTTPException
import mysql.connector 
from fastapi.responses import StreamingResponse
import asyncio
import json

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
    password= "ilovepanthers7850"
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

class Score(BaseModel):
    teamA: str
    teamB: str
    scoreA: int
    scoreB: int

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

    cursor.execute("USE users")
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

    cursor.execute("USE users")
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

primary_user = []

async def event_generator():
    queue = asyncio.Queue()
    primary_user.append(queue)

    try:
        while True:
            data = await queue.get()
            yield f"data: {data}\n\n"
    finally:
         primary_user.remove(queue)
        
@app.get("/stream")
async def stream():
    return StreamingResponse(event_generator(), media_type="text/event-stream")

@app.post("/api/basketball_scores")
async def create_score(score: Score):

    cursor.execute("USE scores_recording")
    sql = """
    INSERT INTO basket_ball_scores (teamA, teamB, scoreA, scoreB)
    VALUES (%s, %s, %s, %s)
    """
    values = (score.teamA, score.teamB, score.scoreA, score.scoreB)

    cursor.execute(sql, values)
    db.commit()

    message = json.dumps({
        "teamA": score.teamA,
        "teamB": score.teamB,
        "scoreA": score.scoreA,
        "scoreB": score.scoreB
    })
    for queue in primary_user:
        await queue.put(message)

    return {"message": "score saved"}

@app.post("/api/soccer_scores")
async def create_score(score: Score):

    cursor.execute("USE scores_recording")
    sql = """
    INSERT INTO soccer_scores (teamA, teamB, scoreA, scoreB)
    VALUES (%s, %s, %s, %s)
    """
    values = (score.teamA, score.teamB, score.scoreA, score.scoreB)

    cursor.execute(sql, values)
    db.commit()

    message = json.dumps({
        "teamA": score.teamA,
        "teamB": score.teamB,
        "scoreA": score.scoreA,
        "scoreB": score.scoreB
    })
    for queue in primary_user:
        await queue.put(message)

    return {"message": "score saved"}