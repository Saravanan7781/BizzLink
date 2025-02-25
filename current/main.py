#main.py

print("======================================================= LocalHost Server Started =====================================================")
from flask import Flask, render_template, request, redirect, url_for, flash, session
import mysql.connector
from flask_session import Session
import smtplib
from email.mime.text import MIMEText


database = mysql.connector.connect(host = "localhost",
                                   user = "root",
                                   password = "123123",
                                   database = "abs")
db = database.cursor()

app = Flask(__name__,static_url_path='/static')
app.secret_key = '%KCP{NB@^f7idgf87rfg34768P:?tggjykO;ppip>Uk}'

app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)


#====================================== /home ===================================
@app.route('/')
@app.route('/home')
def home():
    if not session.get("username"):
        return render_template('home.html',username="User",logined=0)

    
    elif session.get("username") != "Null":
        
        username = session.get("username")
        login_status = 1

    return render_template('home.html',username=username,logined=login_status)



#====================================== /user-signup ===================================
@app.route('/sign-up',methods=['POST','GET'])
def sign_up():
    
    if request.method == 'POST':
        
        #get data from client using POST method
        username = request.form['username']
        email = request.form['email']
        password = request.form['password']
        cpassword = request.form['cpassword']

        
        # list conveter
        email_list = list(email)

        
        # check for same username in database         
        db.execute("SELECT USERNAME FROM USER_LOGIN WHERE USERNAME='{0}';".format(username))
        db_username = db.fetchall()
        if db_username == []:
            username_found = 0           
        else:
            username_found = 1

            
        #check for same email in database
        db.execute("SELECT EMAIL FROM USER_LOGIN WHERE EMAIL='{0}';".format(email))
        db_email = db.fetchall()
        if db_email == []:
            email_found = 0
        else:
            email_found = 1
        
        
        # VALIDATOR
        # username validator
        if username == "":
            flash("Username can't be empty")
            return render_template('sign-up.html')
        
        elif len(username) < 3 or len(username) > 16:
            flash("Username should be 8 - 15 character long")
            return render_template('sign-up.html')
        
        elif username_found == 1:
            flash("Username already taken!. Please try using another name")
            return render_template('sign-up.html')
        
        
        # email validator
        elif email == "":
            flash("Email can't be empty")
            return render_template('sign-up.html')
        
        elif len(email) < 12 or len(email) > 65:
            flash("Email should be 12 - 64 character long")
            return render_template('sign-up.html')
        
        elif email_list[-1] != "m" or email_list[-2] != "o" or email_list[-3] != "c" or email_list[-4] != "." or email_list[-5] != "l" or email_list[-6] != "i" or email_list[-7] != "a" or email_list[-8] != "m"  or email_list[-10] != "@":
            flash("Inavlid Email address")
            return render_template('sign-up.html')
        
        elif email_found == 1:
            flash("Email already Used!. Please login")
            return render_template('sign-up.html')
        
        # password validator
        elif len(password) < 8 or len(password) > 24:
            flash("Password should be 8 - 24 character long")
            return render_template('sign-up.html')
        
        #check for password and confirm password are same
        elif password != cpassword:
            flash("your password does not match confirm password")
            return render_template('sign-up.html')
        
        
        else:
            # store info in database

            db.execute("INSERT INTO USER_LOGIN(USERNAME,EMAIL,PASSWORD) VALUES('{0}','{1}','{2}');".format(username,email,password))
            database.commit()
            flash("Green")


            return redirect(url_for('login'))
        
        
    return render_template('sign-up.html')



#====================================== /user-login =================================================
@app.route('/login',methods=['POST','GET'])
def login():
     if request.method == 'POST':
        
        #get data from client using POST method
        username = request.form['username']
        email = request.form['email']
        password = request.form['password']
       

        
        #get user name and password from database
        db.execute("SELECT USERNAME FROM USER_LOGIN WHERE USERNAME='{0}';".format(username))
        db_username = db.fetchall()
        if db_username == []:
            username_found = 0
       
        else:
            db.execute("SELECT PASSWORD FROM USER_LOGIN WHERE USERNAME='{0}';".format(username))
            db_password = db.fetchone()
            username_found = 1
        
        #check for same email in database
        db.execute("SELECT EMAIL FROM USER_LOGIN WHERE EMAIL='{0}';".format(email))
        db_email = db.fetchall()
        if db_email == []:
            email_found = 0
        else:
            email_found = 1

        if username == "":
            flash("Username can't be empty")
            return render_template('login.html')
        elif email== "":
            flash("Email can't be empty")
            return render_template('login.html')
        elif password == "":
            flash("Password can't be empty")
            return render_template('login.html')
        elif username_found == 0:
            flash("There is no such username and email!")
            return render_template('login.html')
        
        elif password != db_password[0]:
            flash("Invalid username or password")
            return render_template('login.html')
        else:
            session["username"] = username
            flash("Green")
            return redirect(url_for('home'))
        


     return render_template('login.html')



#====================================== /logout ===================================
@app.route('/logout')
def logout():
    session["username"] = None
    return redirect(url_for('home'))

    

#====================================== /user-book-now ===================================
@app.route('/book-now')
def book_now():
    if not session.get("username"):
        flash("Login to access")
        return render_template('login.html', username="User", logined=0)

    elif session.get("username") != "Null":
        print("3")
        username = session.get("username")
        login_status = 1
        db.execute("SELECT * FROM pending_doctors WHERE status='approved'")
        approved_doctors = db.fetchall()

    return render_template('book_now.html', approved_doctors=approved_doctors, username=username, logined=login_status)


@app.route('/book-now/<specialization>')
def book_now_specialization(specialization):
    if not session.get("username"):
        flash("Login to access")
        return render_template('login.html', username="User", logined=0)

    elif session.get("username") != "Null":
        print("3")
        username = session.get("username")
        login_status = 1
        db.execute("SELECT * FROM pending_doctors WHERE status='approved' AND specialization=%s", (specialization,))
        approved_doctors = db.fetchall()

    return render_template('book_now.html', approved_doctors=approved_doctors, username=username, logined=login_status)


@app.route('/submit_appointment', methods=['POST'])
def submit_appointment():
    # Handle the form submission and save the appointment details to the MySQL table
    patient_name = request.form['full_name']
    gender = request.form['gender']
    dob = request.form['dob']
    contact_number = request.form['contact_number']
    email = request.form['email']
    medical_issue = request.form['medical_issue']
    appointment_date = request.form['appointment_date']
    appointment_time = request.form['appointment_time']
    doctor_id = request.form['doctor_id']
    doctor_name = request.form['doctor_name']
    specialization = request.form['specialization']

    # Insert the details into the MySQL table
    insert_query = """
    INSERT INTO new_appointments
    (patient_name, gender, dob, contact_number, email, medical_issue,
    appointment_date, appointment_time, doctor_id,doctor_name, specialization)
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s,%s, %s);
    """
    insert_values = (
        patient_name, gender, dob, contact_number, email, medical_issue,
        appointment_date, appointment_time, doctor_id,doctor_name, specialization
    )
    db.execute(insert_query, insert_values)
    database.commit()

    return redirect(url_for('book_now')) 

    
    
  #---------------------------------------- /my-bookings(user) -------------------------
    
@app.route('/my-bookings')
def my_bookings():
    if not session.get("username"):
        flash("Login as a patient to view your booking log")
        return render_template('login.html', username="Patient", logined=0)

    username = session.get("username")
    # Fetch booking requests for the logged-in patient
    db.execute("SELECT * FROM new_appointments WHERE username = %s", (username,))
    booking_log = db.fetchall()

    return render_template('booking_log.html', booking_log=booking_log,username=username)
    
    
    
    
    
    
    
    
    

#$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$  /doctor-register $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$


@app.route('/doctor-register',methods=['POST','GET'])
def doctor_register():
    
    if request.method == 'POST':
        
        #get data from client using POST method
        doctor_id = request.form['doctor_id']
        doctor_name = request.form['username']
        email = request.form['email']
        password = request.form['password']
        cpassword = request.form['cpassword']
        phone_number = request.form['phone_number'] 
        your_hospital = request.form['Hospital']
        specialization = request.form['Specialization']
        education = request.form['education']
        city = request.form['city']
        address = request.form['address']
        
        
        
        
        # list conveter
        email_list = list(email)

        # CHECK FOR SAME DOCTOR_ID
        db.execute("SELECT DOCTOR_ID FROM PENDING_DOCTORS WHERE DOCTOR_ID='{0}';".format(doctor_id))
        db_doctorid = db.fetchall()
        if db_doctorid == []:
            doctorid_found = 0
        else:
            doctorid_found = 1
        
        
        
        # check for same username in database         
        db.execute("SELECT USERNAME FROM PENDING_DOCTORS WHERE USERNAME='{0}';".format(doctor_name))
        db_username = db.fetchall()
        if db_username == []:
            username_found = 0           
        else:
            username_found = 1

            
        #check for same email in database
        db.execute("SELECT EMAIL FROM PENDING_DOCTORS WHERE EMAIL='{0}';".format(email))
        db_email = db.fetchall()
        if db_email == []:
            email_found = 0
        else:
            email_found = 1
            
       # CHECK FOR SAME PHONE_NUMBER
        db.execute("SELECT PHONE_NUMBER FROM PENDING_DOCTORS WHERE PHONE_NUMBER='{0}';".format(phone_number))
        db_phonenumber = db.fetchall()
        if db_phonenumber == []:
            phonenumber_found = 0
        else:
            phonenumber_found = 1
        
        
        # VALIDATOR
        # doctor_id validator
        if doctor_id == "":
            flash("Doctor_id can't be empty")
            return render_template('doctor-register.html')
        
        elif len(doctor_id)!=12:
            flash("Doctor_id should not be more or less than 12")
        
        
        # username validator
        elif doctor_name == "":
            flash("Username can't be empty")
            return render_template('doctor-registerhtml')
        
        elif len(doctor_name) < 3 or len(doctor_name) > 16:
            flash("Username should be 8 - 15 character long")
            return render_template('doctor-register.html')
        
        elif username_found == 1:
            flash("Username already taken!. Please try using another name")
            return render_template('doctor-register.html')
        
        
        # email validator
        elif email == "":
            flash("Email can't be empty")
            return render_template('doctor-register.html')
        
        elif len(email) < 12 or len(email) > 65:
            flash("Email should be 12 - 64 character long")
            return render_template('doctor-register.html')
        
        elif email_list[-1] != "m" or email_list[-2] != "o" or email_list[-3] != "c" or email_list[-4] != "." or email_list[-5] != "l" or email_list[-6] != "i" or email_list[-7] != "a" or email_list[-8] != "m"  or email_list[-10] != "@":
            flash("Inavlid Email address")
            return render_template('doctor-register.html')
        
        elif email_found == 1:
            flash("Email already Used!. Please login")
            return render_template('doctor-register.html')
        
        # password validator
        elif len(password) < 8 or len(password) > 24:
            flash("Password should be 8 - 24 character long")
            return render_template('doctor-register.html')
        
        #check for password and confirm password are same
        elif password != cpassword:
            flash("your password does not match confirm password")
            return render_template('doctor-register.html')
        
        #check for phone number
        elif phone_number=="":
            flash("Phone number should not be empty")
            return render_template('doctor-register.html')
        
        elif len(phone_number)!=10:
            flash("Your phone number should not be more than or less than ")
            return render_template('doctor-register.html')
        
        
        
        else:
            # store info in database

            db.execute("INSERT INTO PENDING_DOCTORS(DOCTOR_ID,USERNAME,EMAIL,PASSWORD,PHONE_NUMBER,hospital,specialization,education,address,city, STATUS) VALUES('{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','{9}','{10}');".format(doctor_id,doctor_name,email,password,phone_number,your_hospital,specialization,education,address,city,'pending'))
            database.commit()
            flash("Green")

           
            return redirect(url_for('doctor_login'))
        
        
    return render_template('doctor-register.html')

#$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ /doctor-login#$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
@app.route('/doctor-login', methods=['POST', 'GET'])
def doctor_login():
    if request.method == 'POST':
        username = request.form['username']
        email = request.form['email']
        password = request.form['password']

        # Check for empty fields
        if not username or not email or not password:
            flash("All fields are required.")
            return render_template('doctor-login.html')

        # Get user details from the database
        query = "SELECT doctor_id,USERNAME, PASSWORD FROM pending_doctors WHERE username='{0}' AND email='{1}' AND status='approved';".format(username, email)
        db.execute(query)
        db_result = db.fetchone()

        if not db_result:
            flash("Invalid username or email, or the doctor is not approved yet.")
            return render_template('doctor-login.html')

        db_doctorid,db_username, db_password = db_result

        if password != db_password:
            flash("Invalid password.")
            return render_template('doctor-login.html')

        # Successful login
        session["username"] = db_username
        session["doctor_id"] = db_doctorid
        flash("Green")  # Assuming this is a success indicator
        return redirect(url_for('doctor_home'))

    return render_template('doctor-login.html')


#$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ doctor-home $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
@app.route('/doctor_home')
def doctor_home():
    if not session.get("username"):
        return render_template('doctor-home.html',username="User",logined=0)

    
    elif session.get("username") != "Null":
        
      
        username = session.get("username")
        login_status = 1

    return render_template('doctor-home.html',username=username,logined=login_status)








#$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ /doctor-appointments $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

# Routes for Doctor's Dashboard
@app.route('/doctor-dashboard')
def doctor_dashboard():
    if not session.get("doctor_id"):
        flash("Login as a doctor to access the dashboard")
        return render_template('login.html', username="Doctor", logined=0)

    doctor_id = session.get("doctor_id")
    # Fetch booking requests for the logged-in doctor
    db.execute("SELECT * FROM new_appointments WHERE doctor_id = %s", (doctor_id,))
    booking_requests = db.fetchall()

    return render_template('doctor_dashboard.html', booking_requests=booking_requests)

# Route for handling approval or rejection of booking requests
@app.route('/approve_booking', methods=['POST'])
def approve_booking():
    appointment_id = request.form['appointment_id']
    status = request.form['status']
    
    # Update the status in the database
    db.execute("UPDATE new_appointments SET status = %s WHERE appointment_id = %s", (status, appointment_id))
    database.commit()

    return redirect(url_for('doctor_dashboard'))

# Routes for Patient's Booking Log
@app.route('/patient-booking-log')
def patient_booking_log():
    if not session.get("patient_id"):
        flash("Login as a patient to view your booking log")
        return render_template('login.html', username="Patient", logined=0)

    patient_id = session.get("patient_id")
    # Fetch booking requests for the logged-in patient
    db.execute("SELECT * FROM new_appointments WHERE patient_id = %s", (patient_id,))
    booking_log = db.fetchall()

    return render_template('patient_booking_log.html', booking_log=booking_log)


@app.route('/approved_appointments')
def approved_appointments():
    if not session.get("doctor_id"):
        flash("Login as a doctor to access the approved appointments")
        return render_template('doctor-login.html', username="User", logined=0)

    doctor_id = session.get("doctor_id")
    # Fetch approved booking requests for the logged-in doctor
    db.execute("SELECT * FROM new_appointments WHERE doctor_id = %s AND status = 'approved'", (doctor_id,))
    approved_requests = db.fetchall()

    return render_template('approved_appointments.html', approved_requests=approved_requests)




    
#**************************************** /admin-login  *************************************
@app.route('/admin-login',methods=['POST','GET'])
def admin_login():
     if request.method == 'POST':
        
        #get data from client using POST method
        username = request.form['username']
        password = request.form['password']


        #get user name and password from database
        db.execute("SELECT USERNAME FROM ADMIN_DETAILS WHERE USERNAME='{0}';".format(username))
        db_username = db.fetchall()
        if db_username == []:
            username_found = 0
        else:
            db.execute("SELECT PASSWORD FROM ADMIN_DETAILS WHERE USERNAME='{0}';".format(username))
            db_password = db.fetchone()
            username_found = 1


        if username == "":
            flash("Username can't be empty")
            return render_template('admin-login.html')
        elif password == "":
            flash("Password can't be empty")
            return render_template('admin-login.html')
        elif username_found == 0:
            flash("Username not found")
            return render_template('admin-login.html')
        elif password != db_password[0]:
            flash("Invalid username or password")
            return render_template('admin-login.html')
        else:
            session["username"] = username
            flash("Green")
            return redirect(url_for('admin_home'))
        


     return render_template('admin-login.html')

#*****************************************  /admin-home  *************************************

@app.route('/admin_home')
def admin_home():
    if not session.get("username"):
        return render_template('home.html',username="User",logined=0)

    
    elif session.get("username") != "Null":
        
        username = session.get("username")
        login_status = 1

    return render_template('admin-home.html',username=username,logined=login_status)


#******************************************  /admin-dashboard ********************************


#**********************pending doctors*********************
@app.route('/admin_dashboard')
def admin_dashboard():
    # Fetch pending doctors from the database
    db.execute("SELECT * FROM pending_doctors WHERE status='pending'")
    pending_doctors = db.fetchall()
    return render_template('admin_dashboard.html', pending_doctors=pending_doctors)

@app.route('/approve_doctor/<int:doctor_id>')
def approve_doctor(doctor_id):
    # Update the doctor's status to "approved"
    db.execute("UPDATE pending_doctors SET status='approved' WHERE doctor_id=%s", (doctor_id,))
    database.commit()
    
    # Fetch doctor's details to send email
    db.execute("SELECT * FROM pending_doctors WHERE doctor_id=%s", (doctor_id,))
    doctor_email = db.fetchone()
  
    #Send approval email
    #send_email(doctor['email'], "Doctor Approval", "Your doctor registration has been approved.")
     
    db.execute("SELECT * FROM pending_doctors WHERE doctor_id=%s", (doctor_id,))
    doctor = db.fetchone()
    database.commit()
   
    return redirect(url_for('admin_dashboard'))

@app.route('/reject_doctor/<int:doctor_id>')
def reject_doctor(doctor_id):
    
    # Fetch doctor's email before removing from pending_doctors to send email
    # db.execute("SELECT email FROM pending_doctors WHERE id=%s", (doctor_id,))
    #doctor_email = db.fetchone()['email']

    # Remove doctor from pending_doctors
    db.execute("DELETE FROM pending_doctors WHERE doctor_id=%s", (doctor_id,))
    database.commit()

    # Send rejection email
    #send_email(doctor_email, "Doctor Rejection", "Your doctor registration has been rejected.")

    return redirect(url_for('admin_dashboard'))

#def send_email(to_email, subject, message):
 #   msg = MIMEText(message)
  #  msg['Subject'] = subject
   # msg['From'] = smtp_username
    #msg['To'] = to_email

   # server = smtplib.SMTP(smtp_host, smtp_port)
 #   server.starttls()
  #  server.login(smtp_username, smtp_password)
  #  server.sendmail(smtp_username, to_email, msg.as_string())
   # server.quit()


#**********************spectating doctors*********************


@app.route('/remove_doctor/<int:doctor_id>')
def remove_doctor(doctor_id):

    # Delete the doctor from the pending_doctors table based on doctor_id
    db.execute("DELETE FROM pending_doctors WHERE doctor_id=%s", (doctor_id,))
    database.commit()

    return redirect(url_for('approved_doctors'))
 

@app.route('/approved_doctors')
def approved_doctors():
    # Fetch approved doctors from the pending_doctors table where status is approved
    db.execute("SELECT * FROM pending_doctors WHERE status='approved'")
    approved_doctors = db.fetchall()

    
    return render_template('approved_doctors.html', approved_doctors=approved_doctors)























if __name__=='__main__':
    app.run(debug= True)