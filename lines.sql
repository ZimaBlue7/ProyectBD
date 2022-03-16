CREATE database Probd; 
--- tabla admin 

CREATE TABLE IF NOT EXISTS Admin(
    id INTEGER ,
    name_ad VARCHAR(30) NOT NULL,
    code_asis INTEGER,
    CONSTRAINT py_ad PRIMARY KEY (id)
    CONSTRAINT ad_id FOREIGN KEY (id) REFERENCES Users(id) ON DELETE CASCADE
);

INSERT INTO Admin (id,name_ad,code_asis) 
VALUES (12026227, 'Michael Pena',1001),
    (12098755,'John Kyles Rolling',1002),
    (19800545,'Scarlet Brighman',1003),
    (13479050,'Samantha Sousa Silva',1004),
    (19284029,'Thomas Gabriel Marquez',1005);


--- tabla personal(Staff) 
CREATE TABLE IF NOT EXISTS Staff(
    id INTEGER,
    name_s VARCHAR(40) NOT NULL,
    speciality VARCHAR(20) NOT NULL,
    id_proof INTEGER,
    id_ques INTEGER,
    CONSTRAINT py_st PRIMARY KEY (id),
    CONSTRAINT py_sq FOREIGN KEY (id_ques) REFERENCES Question(id) ON DELETE CASCADE,
    CONSTRAINT st_id FOREIGN KEY (id) REFERENCES Users(id) ON DELETE CASCADE
);

INSERT INTO Staff (id,name_s,speciality,id_proof,id_ques)
VALUES (20832768,'Jefferson Amado','Ing Sis',101,1),
    (20098712,'John Sanabria', 'Ing Elec',102,2),
    (21928827,'Paola Ramirez','Magis Des',103,3),
    (27716352,'Kyle Jhonson', 'Ing AI',104,4),
    (21182111,'Viviana Zuluaga','Ing Sis',105,1);

--- tabla curso (course)
CREATE TABLE IF NOT EXISTS course(
    id INTEGER UNIQUE,
    name_co VARCHAR(20) NOT NULL,
    id_staff INTEGER,
    CONSTRAINT py_co PRIMARY KEY (id),
    CONSTRAINT py_cs FOREIGN KEY (id_staff) REFERENCES Staff(id) ON DELETE CASCADE
);

INSERT INTO course (id,name_co, id_staff) 
VALUES (2134,'Fund de Redes',20832768),
    (1983,'Fisica 2',20098712),
    (9823,'Diseño Interfaces',21928827),
    (5736,'Vida artificial',27716352),
    (3298,'Fund Program',21182111);

--- tabla prueba (Proof)
CREATE TABLE IF NOT EXISTS Proof(
    id INTEGER UNIQUE,
    name_pr VARCHAR(15) NOT NULL,
    date_pub DATE NOT NULL,
    status INTEGER NOT NULL,
    CONSTRAINT py_pr PRIMARY KEY (id)
);

INSERT INTO Proof (id,name_pr,date_pub) 
VALUES (101,'Quiz Int red','21-Ene-2022'),
    (102,'Exam Movien','28-Feb-2022'),
    (103,'Introdu Asig', '2-Feb-2022'),
    (104, 'Thinking Art','19-Dic-2021'),
    (105, 'Parcial Funcion','1-Mar-2022');

--- tabla Asistencia (assistance)
CREATE TABLE IF NOT EXISTS Assistance(
    code INTEGER UNIQUE,
    name_as VARCHAR(10) NOT NULL,
    course_ins VARCHAR(20) NOT NULL,
    id_proof INTEGER,
    id_course INTEGER,
    CONSTRAINT py_cou PRIMARY KEY (code),
    CONSTRAINT py_ap FOREIGN KEY (id_proof) REFERENCES Proof(id) ON DELETE CASCADE,
    CONSTRAINT py_ac FOREIGN KEY (id_course) REFERENCES Course(id) ON DELETE CASCADE
);

INSERT INTO Assistance (code,name_as,course_ins,id_proof,id_course) 
VALUES (1,'Assi1','Fund de Redes',101,2134),
    (2,'Assi2','Fisica 2',102,1983),
    (3,'Assi3','Diseño Interfaces',103,9823),
    (4,'Assi4','Vida artificial',104,5736),
    (5,'Assi5','Fund Program',105,3298);

--- tabla estudiantes (students)
CREATE TABLE IF NOT EXISTS Students (
    code INTEGER,
    name_stu VARCHAR(40) NOT NULL,
    semester INTEGER NOT NULL,
    course VARCHAR(30) NOT NULL,
    id_staff INTEGER,
    code_asis INTEGER,
    CONSTRAINT py_stu PRIMARY KEY (code),
    CONSTRAINT stu_id FOREIGN KEY (id) REFERENCES Users(id) ON DELETE CASCADE,
    CONSTRAINT py_sts FOREIGN KEY (id_staff) REFERENCES Staff(id) ON DELETE CASCADE,
    CONSTRAINT py_sa FOREIGN KEY (code_asis) REFERENCES Assistance(code) ON DELETE CASCADE
);

INSERT INTO Students (code,name_stu,semester,course,id_staff,code_asis) 
VALUES (39218724,'Stiven Sphilberg',5,'Fund de Redes',20832768,1),
    (38791089,'Martin Scorsesse',3,'Fisica 2',20098712,2),
    (30928172,'Stanley Kubrick',6,'Diseño de Interfaces',21928827,3),
    (31982782,'Sofia Coppola',8,'Vida Artificial',27716352,4),
    (32109827,'Chloe Zhao',1,'Funda Prom',21182111,5);

--- tabla users
CREATE TABLE IF NOT EXISTS Users (
    id INTEGER UNIQUE,
    name_u VARCHAR(40) NOT NULL,
    password VARCHAR(20) NOT NULL,
    description VARCHAR(50) NOT NULL,
    email VARCHAR(40) NOT NULL,
    CONSTRAINT py_us PRIMARY KEY (id)
);

INSERT INTO Users (id,name_u, password, description, email)
VALUES (12026227,'Pedro Pascal','123456','Administrador','pedro@gmail.com'),
    (2025987,'Camila Rodriguez','sam1307','Estudiante','cami@gmail.com'),
    (12387288,'Mark Hamil','skywalker','Profesor','Trek12@hotmail.com'),
    (2026223,'Juan David Olaya', 'Estudiante','Jd125@gmail.com'), 
    (3219288,'Frank Castle','Administrador','punisher@hotmail.com'); 

--- tabla pregunta (question)
CREATE TABLE IF NOT EXISTS Question(
    id INTEGER UNIQUE,
    description VARCHAR(50) NOT NULL,
    id_opli INTEGER,
    CONSTRAINT py_qu PRIMARY KEY (id),
    CONSTRAINT py_qol FOREIGN KEY (id_opli) REFERENCES OptionList(id) ON DELETE CASCADE
);

INSERT INTO Question(id,description, id_opli) 
VALUES (1,'De que trata el modelo relacional',1),
    (2,'Como funciona una conexion',2),
    (3,'Que es Scrum',3),
    (4,'Explique una condicion de retorno',4),
    (5,'Como se crea una variable',5); 

--- tabla lista de opciones (OptionList)
CREATE TABLE IF NOT EXISTS OptionList(
    id INTEGER,
    type_ol VARCHAR(10) NOT NULL,
    id_o INTEGER,
    CONSTRAINT py_ol PRIMARY KEY (id),
    CONSTRAINT py_olo FOREIGN KEY (id_o) REFERENCES Option (id) ON DELETE CASCADE
);

INSERT INTO OptionList(id,type_ol,id_o) 
VALUES (1,'open',1),
    (2,'open',2),
    (3,'closed',3),
    (4, 'Open',4),
    (5,'Closed',5);

--- tabla opcion (Option)

CREATE TYPE opMultiple AS (
    A       varchar(1),
    B       varchar(1),
    C       varchar(1),
    D       varchar(1);
);

CREATE TYPE trOrfa AS (
    A       Boolean,
    B       Boolean;
);

CREATE TABLE IF NOT EXISTS Option(
    id INTEGER UNIQUE,
    open VARCHAR(20),
    multiple opMultiple,
    tof trOrfa,
    CONSTRAINT py_op PRIMARY KEY (id)
);

INSERT INTO Option(id,open) VALUES (1,' ');
INSERT INTO Option(id,multiple) VALUES (2,('A','B','C','D'));          /*modificar para estructura*/
INSERT INTO option(id,tof) VALUES (3,(True,false));

--- tabla respuesta (Answer)
CREATE TABLE IF NOT EXISTS Answer(
    id INTEGER,
    id_stu INTEGER,
    choose_op VARCHAR(4),
    date_op DATE,
    CONSTRAINT py_an PRIMARY KEY (id),
    CONSTRAINT py_os FOREIGN KEY (id_stu) REFERENCES Students(code) ON DELETE CASCADE
);

INSERT INTO Answer(id,id_stu, choose_op,date_op) 
VALUES (11,39218724,'Modelo de tablas','2022-06-10'),
    (22,38791089,'A','2022-12-01'),
    (33,30928172,'True','2022-10-10'),
    (44,31982782,'Return 1','2021-12-19'),
    (55,32109827,'D','2022-03-01');

--- Creacion de disparadores, procedimientos y vista.
--- trigger que no permite que un estudiante este en el semestre 12 
create or replace TRIGGER st_stu_up
after
update OF semester ON Students FOR EACH ROW
    when new.semester > 12 begin
delete from Students
where code = new.code
end;
--- trigger que no deja cambiar el nombre a un estudiante (por lo que tiene que ser preciso)
create or replace trigger stu_in_id before
update of name_stu on Students for each row begin raise exception 'Cannot be update the name student'
end;
--- trigger que no deja a un estudiante matricular mas de 8 cursos
create trigger cu_stu_ins before
insert on Students
from Students for each row begin
    when CALL pry_sum_cursos(new.id) = 8 then raise exception 'Cannot be insert more courses, you are in the limit' return NULL;
END;
--- procedimiento que me dice cuantos cursos tiene un estudiante
create or replace procedure pry_sum_cursos(INT) LANGUAGE 'plpgsql' AS $$ BEGIN
select count(code)
from Students
where code = $1;
END;
$$ CALL pry_sum_cursos(2021233);
--- procedimiento que me dice cuantos cursos ha creado el profesor
create or replace procedure pry_sum_staf(INT) LANGUAGE 'plpgsql' AS $$ BEGIN
select count(id_staff)
from Courses
where id_staff = $1;
END;
$$ CALL pry_sum_stad(2123321);
--- vista para sustentar el reporte de asistencia y respuestas de los estudiantes
CREATE VIEW vw_re_stas AS
SELECT st.code as "codeStudent",
    an.id as "AnswerStudent"
from Students st,
    Answer an;