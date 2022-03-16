CREATE database Probd --- tabla admin 
CREATE TABLE IF NOT EXISTS Admin(
    id INTEGER UNIQUE,
    name_ad VARCHAR(30) NOT NULL,
    code_asis INTEGER,
    CONSTRAINT py_ad PRIMARY KEY (id)
);
--- tabla personal(Staff) 
CREATE TABLE IF NOT EXISTS Staff(
    id INTEGER UNIQUE,
    name_s VARCHAR(40) NOT NULL,
    speciality VARCHAR(10) NOT NULL,
    id_proof INTEGER,
    id_ques INTEGER,
    CONSTRAINT py_st PRIMARY KEY (id),
    CONSTRAINT py_sq FOREIGN KEY (id_ques) REFERENCES Question(id) ON DELETE CASCADE
);
--- tabla curso (course)
CREATE TABLE IF NOT EXISTS course(
    id INTEGER UNIQUE,
    name_co VARCHAR(20) NOT NULL,
    id_staff INTEGER,
    CONSTRAINT py_co PRIMARY KEY (id),
    CONSTRAINT py_cs FOREIGN KEY (id_staff) REFERENCES Staff(id) ON DELETE CASCADE
);
--- tabla prueba (Proof)
CREATE TABLE IF NOT EXISTS Proof(
    id INTEGER UNIQUE,
    name_pr VARCHAR(10) NOT NULL,
    date_pub DATE NOT NULL,
    status INTEGER NOT NULL,
    CONSTRAINT py_pr PRIMARY KEY (id)
);
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
--- tabla estudiantes (students)
CREATE TABLE IF NOT EXISTS Students (
    code serial UNIQUE name_stu VARCHAR(40) NOT NULL,
    semester INTEGER NOT NULL,
    courses VARCHAR(20) NOT NULL,
    id_staff INTEGER,
    code_asis INTEGER,
    CONSTRAINT py_st PRIMARY KEY (code),
    CONSTRAINT py_sts FOREIGN KEY (id_staff) REFERENCES Staff(id) ON DELETE CASCADE,
    CONSTRAINT py_sa FOREIGN KEY (code_asis) REFERENCES Assistance(code) ON DELETE CASCADE
);
--- tabla users
CREATE TABLE IF NOT EXISTS Users (
    id serial UNIQUE,
    name_u VARCHAR(40) NOT NULL,
    password VARCHAR(20) NOT NULL,
    description VARCHAR(50) NOT NULL,
    email VARCHAR(40) NOT NULL,
    id_stu INTEGER,
    id_staff INTEGER,
    id_admin INTEGER,
    CONSTRAINT py_us PRIMARY KEY (id),
    CONSTRAINT py_us FOREIGN KEY (id_stu) REFERENCES Students(code) ON DELETE CASCADE,
    CONSTRAINT py_ust FOREIGN KEY (id_staff) REFERENCES Staff(id) ON DELETE CASCADE,
    CONSTRAINT py_ua FOREIGN KEY (id_admin) REFERENCES Admin(id_ad) ON DELETE CASCADE
);
--- tabla pregunta (question)
CREATE TABLE IF NOT EXISTS Question(
    id INTEGER UNIQUE,
    description VARCHAR(50) NOT NULL,
    id_opli INTEGER,
    CONSTRAINT py_qu PRIMARY KEY (id),
    CONSTRAINT py_qol FOREIGN KEY (id_opli) REFERENCES OptionList(id) ON DELETE CASCADE
);
--- tabla lista de opciones (OptionList)
CREATE TABLE IF NOT EXISTS OptionList(
    id INTEGER,
    type_ol VARCHAR(10) NOT NULL,
    id_o INTEGER,
    CONSTRAINT py_ol PRIMARY KEY (id),
    CONSTRAINT py_olo FOREIGN KEY (id_o) REFERENCES Option (id) ON DELETE CASCADE
);
--- tabla opcion (Option)
CREATE TABLE IF NOT EXISTS Option(
    id INTEGER UNIQUE,
    open VARCHAR(20),
    multiple VARCHAR(1),
    tof VARCHAR(5),
    CONSTRAINT py_op PRIMARY KEY (id)
);
--- tabla respuesta (Answer)
CREATE TABLE IF NOT EXISTS Answer(
    id INTEGER,
    id_stu INTEGER,
    choose_op VARCHAR(4),
    date_op DATE,
    CONSTRAINT py_an PRIMARY KEY (id),
    CONSTRAINT py_os FOREIGN KEY (id_stu) REFERENCES Students(code) ON DELETE CASCADE
);
--- Creacion de disparadores, procedimientos y vista.
--- trigger que no permite que un estudiante este en el semestre 12 
create or replace TRIGGER st_stu_up
after
update of semester on Students for each row
    when NEW.semester > 12 begin
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