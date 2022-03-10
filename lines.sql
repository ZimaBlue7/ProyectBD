CREATE database Probd

--- tabla users
CREATE TABLE IF NOT EXISTS Users (

    id_u serial UNIQUE,
    name_u VARCHAR(40) NOT NULL,
    password_u VARCHAR(20) NOT NULL,
    email_u VARCHAR(40) NOT NULL,
    description_u VARCHAR(50) NOT NULL,
    CONSTRAINT py_us PRIMARY KEY (id_u)

);

--- tabla admin 

CREATE TABLE IF NOT EXISTS admin(

    id_ad INTEGER UNIQUE,
    name_ad VARCHAR(30) NOT NULL,
    CONSTRAINT py_ad PRIMARY KEY (id_ad)
    
);

--- tabla personal(Staff) 

CREATE TABLE IF NOT EXISTS Staff(

    id_s INTEGER UNIQUE,
    id_us INTEGER,
    name_s VARCHAR(40) NOT NULL,
    speciality VARCHAR(10) NOT NULL,
    CONSTRAINT py_st PRIMARY KEY (id_s)
    
);

--- tabla curso (course)

CREATE TABLE IF NOT EXISTS course(

    id_co INTEGER UNIQUE,
    name_co VARCHAR(20) NOT NULL,
    id_staff INTEGER,
    CONSTRAINT py_co PRIMARY KEY (id_co),
    CONSTRAINT py_cs FOREIGN KEY (id_staff) REFERENCES Staff(id_s) ON DELETE CASCADE

);

--- tabla prueba (Proof)

CREATE TABLE IF NOT EXISTS Proof(

    id_pr INTEGER UNIQUE, 
    name_pr VARCHAR(10) NOT NULL, 
    date_pub DATE NOT NULL, 
    status_pr INTEGER NOT NULL,
    CONSTRAINT py_pr PRIMARY KEY (id_pr)

);

--- tabla Asistencia (assistance)

CREATE TABLE IF NOT EXISTS Assistance(

    code_as INTEGER UNIQUE,
    name_as VARCHAR(10) NOT NULL,
    course_ins VARCHAR(20) NOT NULL,
    id_proof INTEGER,
    CONSTRAINT py_ap FOREIGN KEY (id_proof) REFERENCES Proof(id_pr) ON DELETE CASCADE

);

--- tabla estudiantes (students)

CREATE TABLE IF NOT EXISTS Students (

    code_stu serial UNIQUE 
    name_stu VARCHAR(40) NOT NULL,
    semester INTEGER NOT NULL 
    courses  VARCHAR(20) NOT NULL, 
    id_staff INTEGER,
    code_asis INTEGER,
    CONSTRAINT py_st PRIMARY KEY (id_stu),
    CONSTRAINT py_sts FOREIGN KEY (id_staff) REFERENCES Staff(id_s) ON DELETE CASCADE,
     CONSTRAINT py_sa FOREIGN KEY (code_asis) REFERENCES Assistance(code_as) ON DELETE CASCADE

);

--- tabla pregunta (question)

CREATE TABLE IF NOT EXISTS Question(

    id_qu INTEGER,
    descrption_qu VARCHAR(50) NOT NULL,
    CONSTRAINT py_qu PRIMARY KEY (id_qu)

);

--- tabla lista de opciones (OptionList)

CREATE TABLE IF NOT EXISTS OptionList(

    id_ol  INTEGER,
    type_ol VARCHAR(10) NOT NULL,
    CONSTRAINT py_ol PRIMARY KEY (id_ol),
);

--- tabla opcion (Option)

CREATE TABLE IF NOT EXISTS Option(

    open_op VARCHAR(20),
    multiple_op VARCHAR(1),
    tof VARCHAR(5)

);

 --- tabla respuesta (Answer)

CREATE TABLE IF NOT EXISTS Answer(

    id_an INTEGER,
    id_stu INTEGER,
    choose_op VARCHAR(4),
    date_op DATE,
    CONSTRAINT py_an PRIMARY KEY (id_an)

);
