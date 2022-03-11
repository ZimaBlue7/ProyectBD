CREATE database Probd

--- tabla admin 

CREATE TABLE IF NOT EXISTS Admin(

    id_ad INTEGER UNIQUE,
    name_ad VARCHAR(30) NOT NULL,
    code_asis INTEGER,
    CONSTRAINT py_ad PRIMARY KEY (id_ad)
    
);

--- tabla personal(Staff) 

CREATE TABLE IF NOT EXISTS Staff(

    id_s INTEGER UNIQUE,
    id_us INTEGER,
    name_s VARCHAR(40) NOT NULL,
    speciality VARCHAR(10) NOT NULL,
    id_proof INTEGER,
    id_ques INTEGER,
    CONSTRAINT py_st PRIMARY KEY (id_s),
    CONSTRAINT py_sq FOREIGN KEY (id_ques) REFERENCES Question(id_qu) ON DELETE CASCADE
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
    id_course INTEGER,
    CONSTRAINT py_ap FOREIGN KEY (id_proof) REFERENCES Proof(id_pr) ON DELETE CASCADE,
    CONSTRAINT py_ac FOREIGN KEY (id_course) REFERENCES Course(id_co) ON DELETE CASCADE

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

--- tabla users
CREATE TABLE IF NOT EXISTS Users (

    id_u serial UNIQUE,
    name_u VARCHAR(40) NOT NULL,
    password_u VARCHAR(20) NOT NULL,
    email_u VARCHAR(40) NOT NULL,
    description_u VARCHAR(50) NOT NULL,
    email_u VARCHAR(30) NOT NULL,
    id_stu INTEGER,
    id_staff INTEGER,
    id_admin INTEGER,
    CONSTRAINT py_us PRIMARY KEY (id_u),
    CONSTRAINT py_us FOREIGN KEY (id_stu) REFERENCES Students(code_stu) ON DELETE CASCADE,
    CONSTRAINT py_ust FOREIGN KEY (id_staff) REFERENCES Staff(id_s) ON DELETE CASCADE,
    CONSTRAINT py_ua FOREIGN KEY (id_admin) REFERENCES Admin(id_ad) ON DELETE CASCADE
);

--- tabla pregunta (question)

CREATE TABLE IF NOT EXISTS Question(

    id_qu INTEGER UNIQUE,
    descrption_qu VARCHAR(50) NOT NULL,
    id_opli INTEGER,
    CONSTRAINT py_qu PRIMARY KEY (id_qu)
    CONSTRAINT py_qol FOREIGN KEY (id_opli) REFERENCES OptionList(id_ol) ON DELETE CASCADE
);

--- tabla lista de opciones (OptionList)

CREATE TABLE IF NOT EXISTS OptionList(

    id_ol  INTEGER,
    type_ol VARCHAR(10) NOT NULL,
    id_o INTEGER
    CONSTRAINT py_ol PRIMARY KEY (id_ol),
    CONSTRAINT py_olo FOREIGN KEY (id_o) REFERENCES Option (id_op) ON DELETE CASCADE
);

--- tabla opcion (Option)

CREATE TABLE IF NOT EXISTS Option(

    id_op INTEGER UNIQUE,
    open_op VARCHAR(20),
    multiple_op VARCHAR(1),
    tof VARCHAR(5),
    CONSTRAINT py_op PRIMARY KEY (id_op)

);

 --- tabla respuesta (Answer)

CREATE TABLE IF NOT EXISTS Answer(

    id_an INTEGER,
    id_stu INTEGER,
    choose_op VARCHAR(4),
    date_op DATE,
    CONSTRAINT py_an PRIMARY KEY (id_an),
    CONSTRAINT py_os FOREIGN KEY (id_stu) REFERENCES Students(id_stu) ON DELETE CASCADE

);

--- Creacion de disparadores, procedimientos y vista.

--- trigger que me valida que no se puedan poner numeros en los nombres
create trigger trg_trigger_test_ins before insert on user
for each row
begin
    if new.username REGEXP '^[0-9]*$' then
        signal sqlstate '45000' set message_text = 'Invalid username containing only digits';
    end if;
end

--- trigger que valida la existencia unica de los alumnos tambien por codigo

--- trigger que no deja a un estudiante matricular mas de 8 cursos

--- procedimiento que me dice cuantos cursos tiene un estudiante

--- procedimiento que me dice cuantos cursos ha creado el profesor

--- vista





