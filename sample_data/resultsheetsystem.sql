DROP TABLE IF EXISTS RESULT_REPORT; 
DROP TABLE IF EXISTS ASSESSMENT; 
DROP TABLE IF EXISTS COURSE; 
DROP TABLE IF EXISTS EMPLOYEE; 
DROP TABLE IF EXISTS GUARDIAN; 
DROP TABLE IF EXISTS STUDENT; 


CREATE TABLE EMPLOYEE(
E_id CHAR(11) NOT NULL UNIQUE,
Fname VARCHAR(150) NOT NULL,
Minit CHAR,
Lname VARCHAR(15) NOT NULL,
Sex CHAR,
DOB DATE,
email VARCHAR(120) NOT NULL,
Education_status VARCHAR(200),
Password CHAR(8) NOT NULL,
PRIMARY KEY(E_id)
)ENGINE=InnoDB DEFAULT CHARSET=latin1; 



CREATE TABLE STUDENT(
Reg_no CHAR(11) NOT NULL UNIQUE,
Fname VARCHAR(150) NOT NULL,
Minit CHAR,
Lname VARCHAR(150) NOT NULL,
Sex CHAR,
DOB DATE,
Address VARCHAR(255),
S_login_code CHAR(8) NOT NULL,
PRIMARY KEY(Reg_no)
)ENGINE=InnoDB DEFAULT CHARSET=latin1; 


CREATE TABLE GUARDIAN(
Student_reg_no CHAR(11) NOT NULL,
Guardian_name VARCHAR(150),
Relationship VARCHAR(150),
ContactNumber char(11) ,  
G_login_code CHAR(8),
PRIMARY KEY(Student_reg_no,Guardian_name),
FOREIGN KEY(Student_reg_no) REFERENCES STUDENT(Reg_no)
)ENGINE=InnoDB DEFAULT CHARSET=latin1; 



CREATE TABLE COURSE(
Course_id CHAR(15) NOT NULL,
Course VARCHAR(150) NOT NULL,
Instructor_id CHAR(11),
Ass_crud_code CHAR(16),
PRIMARY KEY(Course_id),
FOREIGN KEY(Instructor_id) REFERENCES EMPLOYEE(E_id)
)ENGINE=InnoDB DEFAULT CHARSET=latin1; 



CREATE TABLE ASSESSMENT(
Course_id CHAR(15) NOT NULL ,
Ass_id CHAR(15) NOT NULL ,
Assessment VARCHAR(150) NOT NULL,
Supervisor_id CHAR(11),
Assessor_id CHAR(11),
Scheduled_date timestamp NOT NULL,
Ass_login_code CHAR(12),
PRIMARY KEY(Course_id,Ass_id),
FOREIGN KEY(Supervisor_id) REFERENCES EMPLOYEE(E_id),
FOREIGN KEY(Assessor_id) REFERENCES EMPLOYEE(E_id),
FOREIGN KEY (Course_id) REFERENCES COURSE(Course_id)
)ENGINE=InnoDB DEFAULT CHARSET=latin1; 



CREATE TABLE RESULT_REPORT(
Student_reg_no CHAR(11) NOT NULL,
Course_id CHAR(15) NOT NULL,
Ass_id CHAR(15) NOT NULL,
Marks INT,
Updated_date timestamp NOT NULL DEFAULT current_timestamp(),
PRIMARY KEY(Student_reg_no,Course_id,Ass_id),
FOREIGN KEY(Student_reg_no) REFERENCES STUDENT(Reg_no),
FOREIGN KEY(Course_id,Ass_id) REFERENCES ASSESSMENT(Course_id,Ass_id)
)ENGINE=InnoDB DEFAULT CHARSET=latin1; 




INSERT INTO STUDENT VALUES
('2021/0001','Miyushan','S','Rodrigo','M','1998-1-28','6/A, Manaweriya, Kochchikade','aaaa1111'),
('2021/0002','Madusha','T','Keshan','M','1998-1-23','56,Alawila,Puttalam','0011aaaa'),
('2021/0003','Gihan','P','Priyadarshana','M','1997-6-19','50, Dipo Rd, Nuwara Eliya','00024015'),
('2021/0004','Dinuka','S','Mudushan','M','1997-10-28','60/55, Waduragaloawatte, Chillow','00030743'),
('2021/0005','Sisila','B','Senevirathna','M','1995-01-09','731 Galnawa, Anuradhapura','30000334'),
('2021/0006','Dinesh','T','Chandrika','M','1995-12-08','638 Kumbaoluwagama, Pundaluoya','40008886'),
('2021/0007','Dulshani','S','Somarathna','F','1968-01-19','3321 Kurunegala Rd, ','25000987'),
('2021/0008','Manushi','B','Jayawardana','F','2001-06-20','291 Nuwara Eliya Rd, Keppetipola','30008886'),
('2021/0009','Ramesh','K','Narayan','M','2002-09-15','975 Ariviyal Nagar, Kilinochchi','38000334'),
('2021/0010','Hansika','A','Sewwandi','F','1998-07-31','5631 Meepilimana, Nuwara Eliya','25003334'),
('2021/0011','Dinesh','N','Ranasinghe','M','1998-12-27','167/A, Jayathilaka Drive, Nuwara Eliya','Dinesh12'),
('2021/0012','Nadun','C','Perera','M','1998-12-31','12,Mahinda Drive,Hawa Eliya, Nuwara Eliya','Nadun12'),
('2021/0013','Prabath','M','Weerasinghe','M','1995-6-19','Choicy Drive, Kumbaloluwa, Pundaluoya','Prabath1'),
('2021/0014','MOHAMMED','A','ROZNI','M','1998-10-28','NO 7/1,RIHANA MAHAL, MUSTHAFA HAJIYAR ROAD,BATTICALOA.','00780743'),
('2021/0015','SUMESH','B','AKALANKA','M','1997-01-09','SUSANDI STORES, NANUOYA ROAD, NUWARA ELIYA, NUWARA ELIYA','300AA334'),
('2021/0016','SHAKTHI','','ANUVATHAN','M','1997-12-08','KADDAIPARICHCHAN-NORTH, MUTHUR, TRINCOMALEE.','400AA886'),
('2021/0017','VIHANGA','O','MANIKKA ARACHCHI','M','1998-01-19','HIMASARA, IHALAGAMA, MADAMPE.','250009AA'),
('2021/0018','LAKINDU','B','KURUPPU ARACHCHI','M','1998-06-20','PRADEEPA, SWARNA JAYANTHI MAWATHA, NEW TOWN, POLONNARUWA.','3AA08886'),
('2021/0019','CHANDULA','G','ARIYATHILAKA','F','1998-09-15','618/43, BUDDHAGAYA MAWATHA, ANURADHAPURA.','38000AA4'),
('2021/0020','JAMALDEEN','M','ARSHATH','M','1997-07-31','541, ARUGAMBAY ROAD, POTTUVIL/15, POTTUVIL.','25003ASD'),
('2021/0021','MOHAMED','M','ASLAM','M','1996-1-28','NO 07, WEERASEKARAPURA, KALAPITIYA, HEDUNUWEWA.','aaaa11AS'),
('2021/0022','UDARA','N','BANDARA','M','1998-1-23','C/O B.M.PIYATHILAKA, ZONAL EDUCATION OFFICE QUARTERS, NUWARA ELIYA.','SD11aaaa'),
('2021/0023','THILINA','S','BANDARA','M','1998-6-19','50, IPALOGAMA, KUMBUKKALLA, PUTHTHALAMA.','000240DF'),
('2021/0024','SASINDU','L','BANDARA','M','1997-10-28','I.M.B.G.UPAWANSHA BANDARA, UDA PARA, PERAWANGUWA, HANGURANKETHA.','0003074D'),
('2021/0025','DINETH','D','BANDARA','M','1998-01-09','UNAGASWEWA, KIRIGALWEWA, MEDWACHCHIYA, ANURADHAPURA.','300003GG'),
('2021/0026','ISURU','A','CUMARA','M','1997-12-08','610-A, TEMPLE ROAD, HALDANDUWANA, DANKOTUWA.','400088SD'),
('2021/0027','SACHINTHA','L','DE SILVA','M','1997-01-19','NO.04, SUMEDHAGAMA, TRINCOMALEE.','25000DF7'),
('2021/0028','ANURADHA','A','DHANANJAYA','M','1998-06-20','NO 58/B, ARALUGASMADA, BADALKUMBURA.','WW008886'),
('2021/0029','ASANKA','P','DHARMASENA','M','1995-09-15','YATIPAGAMUWA, WELIGEPOLA, BALANGODA, RATHNAPURA.','38ER0334'),
('2021/0030','RISHANGI','C','DISSANAYAKE','F','1998-07-31','THILAK FURNITURE, 27 JUNCTION, PAHALAMARAGAHAWEWA.','25RT03334'),
('2021/0031','HIRAN','H','ERANDA','M','1997-1-28','HIRAN ERANDA, MALWANEGAMA, TALAWA, ANURADHAPURA.','aaaa11ER'),
('2021/0032','DESHAN','L','FERNANDO','M','1998-1-23','143/1, DAMMANIKETHANARAMA PARA, SINGAKKULIYA, YOGIYANA.','RT11aaaa'),
('2021/0033','RASHAIN','D','FERNANDO','M','1997-6-19','174, MEDA DUMMALADENIYA, WENNAPPUWA.','000240TR'),
('2021/0034','SACHINTHA','N','FERNANDO','M','1997-10-28',"258/A, 'FERNANDO VILLA', ULHITIYAWA WEST, WENNAPPUWA.",'RT030743'),
('2021/0035','RAJADURAI','','GAJALAKSAN','M','1998-01-09','NO 106, HAPUTHALE ROAD, BANDARAWELA.','30000RT4'),
('2021/0036','VIJAYENTHIRAN','','GOBISHANGAR','M','1997-12-08','513/1, KANIYA STREET, ANPUVALIPURAM, TRINCOMALEE.','4000RT86'),
('2021/0037','DARSHANA','M','MADUSHAN','M','1998-01-19','NO 54B, KATTIYAWA, YAYA10, EPPAWALA.','250009YT'),
('2021/0038','RAJITHA','P','HEMACHANDRA','M','2001-06-20','NO.668/A, RAJANGANAYA,LEFT BANK, TRACK 03,SOLEPURA, RAJANGANAYA.','300088UY'),
('2021/0039','SACHINTHANA','D','HEWAGE','F','1998-09-15','47/A, SAMAGI MAWATHA, MATHALE JUNCTION, ANURADHAPURA.','380003IU'),
('2021/0040','THILAN','S','HITIHAMU','M','1996-07-31','NO 58, GATAKULAWA, RIKILLAGASKADA.','50033OIU'),
('2021/0041','SABURUDHEEN','','IBRAHIM','M','1998-1-28','A.S.SABURUDHEEN, PUTHUKKUDIYIRUPPU, ERUKKALAMPITTY, MANNAR.','aaaa11UI'),
('2021/0042','HESHAN','N','JAYASEKARA','M','1998-1-23','NO.82, BOGAHALANDHA, ADHIKARIGAMA.','0011aaIO'),
('2021/0043','CHARITH','S','JAYAWARDHANA','M','1997-6-19','NO 34, RATHNODAGAMA, AMBAGAHAWATTE, WELIMADA.','0PO24015'),
('2021/0044','KRISHNADHASAN','','KAJAMOHAN','M','1998-10-28','NO 300 RATNAKIRIYA COLONY, LINDULA.','00030OI3'),
('2021/0045','SUPUN','P','KANDEPOLA','M','1998-01-09','A/KANADARA RATHMALE, UPULDENIYA, GALENBINDUNUWEWA.','3LK00334'),
('2021/0046','BAKEERATHAN','','KASTHURI','F','1998-12-08','KPK BUILDING CONSTRUCTION WORKS, RATHINAPURAM, KILINOCHCHI, KILINOCHCHI.','400KJ886'),
('2021/0047','SANDUNI','S','KEMARATHNA','F','1996-01-19','MAHAPITIYA, UDAMAKURUPPA, RIKILLAGASKADA.','25JH0987'),
('2021/0048','HASHITHA','L','KULARATHNA','M','1996-06-20','THILINA NIWASA, MADAMAGAMA, BADALKUMBURA, BADALKUMBURA.','HG008886'),
('2021/0049','SUDILA','T','KULARATHNA','M','1997-09-15','NO 323/2, TRACT 5, JAYANTHIPURA, POLONNARUWA.','380GF334'),
('2021/0050','ASELA','M','VIRAJ','M','1997-07-31','HALMILLAKULAMA, PERIMIYANKULAMA, ANURADHAPURA.','25003FD4');


INSERT INTO EMPLOYEE VALUES
('987987988','Nishantha','S','Galappaththi','M','1974-03-29','nishantha999@gmail.com','B.Sc.Eng(Hons)(Peradeniya)','nish4@11'),
('987987989','Pubudu','A','Jayasinghe','M','1979-03-29','pubudumora@gmail.com','B.Sc.Eng(Hons)(Moratuwa)','pubudu/1'),
('999887777','Jecobe','S','Fernando','M','1968-01-19','mrjecobe@gmail.com','B.Sc.Eng(Hons)(Jaffna)','jecobe78'),
('987987987','Ahmad','V','Jabbar','M','1985-03-29','ahmadahmad@gmail.com','B.Sc.Eng(Hons)(Moratuwa)','Ahmad@11'),
('453453453','Amila','P','Rajapaksha','M','1972-07-31','amila789@yahoo.com','B.Sc.Eng(Hons)(Peradeniya)','aml$1234'),
('123456789','Upul','B','Kumara','M','1965-01-09','upulb123@yahoo.com','B.Sc.Eng(Hons)(Peradeniya)','upul1234'), 
('888665555','Rubi','','Somasundaram ','F','1937-11-10','rubi555@yahoo.com','B.Sc.Eng(Hons)(Jaffna)','rubi&123'),
('333445555','Sanath','T','Kumarathunga','M','1955-12-08','sanath.t@gmail.com','B.Sc.Eng(Hons)(Moratuwa)','sanath56'),
('987654321','Jennifer','B','Wallace','F','1941-06-20','jenifr@gmail.com','B.Sc.Eng(Hons)(Moratuwa)','jeny1111'),
('666884444','Ramesh','K','Kumar','M','1962-09-15','rameshkumar@gmail.com','B.Sc.Eng(Hons)(Jaffna)','ramesh@1'),
('333445556','Raveendra','T','Rthnayaka','M','1997-12-08','raveendra5@gmail.com','B.Sc.Eng(Hons)(Jaffna)','ravee564'),
('987654322','Lakshmi','','Sundaram','F','1961-06-20','laxmi65@gmail.com','B.Sc.Eng(Hons)(Moratuwa)','lakx1111'),
('666884445','Himali','K','Siriwardane','F','1992-09-15','himali777@gmail.com','B.Sc.Eng(Hons)(Jaffna)','himali@1'),
('666884446','Gayan','','Lakmal','M','1982-09-15','glakmal7@gmail.com','B.Sc.Eng(Hons)(Peradeniya)','gayan611');



INSERT INTO COURSE VALUES
('MC1100','Discrete Mathematics',	'987987988','201311MC1'),
('MC1101','Engineering Metrology','987987989','210220151'),
('MC1010','English Language Enhancement','999887777','307420141'),
('IT1001','Computer Programming','987987987','015201611'),
('ID1010','Engineering Drawing','453453453','0152ty611'),
('CE2021','Engineering Mechanics','123456789','0152qw611'),
('MC2010','Introduction to Electronics and Instrumentation','888665555','0152qwe611');


INSERT INTO ASSESSMENT VALUES
('MC1100','MC/ASS01','Assignment 1','333445556','333445555','2021-09-09 10:00:00','mcassone0'),
('MC1100','MC/ASS02','Assignment 2','987654322','333445555','2021-09-21 10:00:00','twomc1100'),
('MC1100','MC/ASS03','Assignment 3','666884446','333445555','2021-10-12 10:00:00','65omc1100'),
('MC1100','MC/ASS04','Assignment 4','987654321','987987988','2021-10-25 10:00:00','65om65100'),
('MC1101','MC/ASS01','Assignment 1','333445555','666884444','2021-09-05 10:00:00','000333aaa'),
('IT1001','IT/MIDXAM','Mid Exam','888665555','987987987','2021-12-09 10:00:00','@usamelan'),
('IT1001','IT/ASS01','Presentation','666884444','666884444','2021-12-01 10:00:00','%@fDLA!#S'),
('ID1010','ID/ASS01','Assignment 1','666884445','987654322','2021-09-19 10:00:00','98assone0'),
('ID1010','ID/ASS02','Assignment 2','666884446','987654322','2021-10-21 10:00:00','78omc1100'),
('CE2021','CE/QUI01','Quiz 1','123456789','123456789','2021-09-19 10:00:00','mcassopo0'),
('CE2021','CE/ASS01','Assignment 1','987654322','666884445','2021-09-11 10:00:00','tuimc1100'),
('MC2010','MC/ASS01','Assignment 1','987654321','666884446','2021-09-19 10:00:00','m78ssone0'),
('MC2010','MC/ASS02','Assignment 2','666884444','666884446','2021-09-30 10:00:00','tdfmc1100'),
('MC2010','MC/QUI01','Quiz 1','888665555','666884446','2021-09-12 10:00:00','65omc11qw'),
('MC2010','MC/QUI02','Quiz 2','888665555','666884446','2021-10-25 10:00:00','65om65178'),
('MC2010','MC/PRS03','Presentation','888665555','888665555','2021-12-05 10:00:00','000333asa');


INSERT INTO GUARDIAN VALUES

('2021/0010','Kumari','Mother','0758297140','$%gfhj'),
('2021/0001','Nipuni','Sister','0781236985','^&gf*^'),
('2021/0002','Amara','Guardian','0723695641','sdfcvs'),
('2021/0003','Abeypala','Uncle','0745672310','sds@#w'),
('2021/0004','Sugath','Father','0771789321','/*-iuy'),
('2021/0005','Nirasha','Sister','0765262101','165fg2'),
('2021/0006','Raani','Aunty','0745642010','s30@#w'),
('2021/0007','Perera','Guardian','0726368541','s89cvs'),
('2021/0008','Kumara','Father','0771896451','/#$%uy'),
('2021/0009','Ranjani','Aunty','0749632190','sds@#w'),
('2021/0010','Sarath','Father','0768652839','as@#as'),
('2021/0011','Supuni','Sister','0781236955','^&gfc^'),
('2021/0012','Anula','Mother','0723698041','sdfcss'),
('2021/0013','Ruwan','Brother','0756984126','umea44'),
('2021/0014','Mohommed','Father','0771896322','/d-iuy'),
('2021/0015','Disna','Sister','0765266220','165ff2'),
('2021/0016','Paradamada','Aunty','0765266310','g65fg2'),
('2021/0017','Dinu','Sister','0726398541','s89cvd'),
('2021/0018','Sopiya','Grandmother','0771896651','s#$%uy'),
('2021/0019','Pathirage','Grandfather','0756984125','amea44'),
('2021/0020','Fathima','Mother','0765666210','165fs2'),
('2021/0021','Azam','Guardian','0781236685','^&gff^'),
('2021/0022','Perera','Guardian','0723638541','sdgcvs'),
('2021/0023','Tharangi','Mother','0745632370','sdsh#w'),
('2021/0024','Hemantha','Father','0771696321','/*hiuy'),
('2021/0025','Asha','Sister','0745655010','s30@#g'),
('2021/0026','Amal','Brother','0745652010','s30@hw'),
('2021/0027','Kamal','Brother','0724398541','s89jvs'),
('2021/0028','Chandrapala','Uncle','0771896121','/*jiuy'),
('2021/0029','Mery','Mother','0756981525','umea4j'),
('2021/0030','Victor','Father','0768650839','as@jas'),
('2021/0031','Lakshitha','Brother','0781216985','c&gf*^'),
('2021/0032','David','Brother','0723398541','sdfvvs'),
('2021/0033','Lanka','Sister','0745113210','sds@#b'),
('2021/0034','Dilki','Sister','0771896321','/*-iay'),
('2021/0035','Anoja','Sister','0765266210','165fq2'),
('2021/0036','Darumpala','Father','0741642010','w30@#w'),
('2021/0037','Mangala','Sister','0726098541','s8tcvs'),
('2021/0038','Shalika','Sister','0771896651','/#y%uy'),
('2021/0039','Nalin','Brother','0756984165','umeu44'),
('2021/0040','Janaka','Father','0768642839','as@ias'),
('2021/0041','Asad','Father','0781236985','^&gf*12'),
('2021/0042','Jayanthi','Mother','0723698541','sd2cvs'),
('2021/0043','Iresha','Mother','0745893210','sds@#3'),
('2021/0044','Sasikala','Mother','0771796651','/#4%uy'),
('2021/0045','Cahmika','Father','0745647010','s305#w'),
('2021/0046','Daniel','Father','0768645839','as@#6s'),
('2021/0047','Sarath','Father','0726398451','s89c7s'),
('2021/0048','Kanthi','Father','0771096651','/#$%8y'),
('2021/0049','Maliyadda','Father','0756934125','u9ea44');

INSERT INTO RESULT_REPORT VALUES
('2021/0008','MC1100','MC/ASS01',65,'2021-07-15 16:05:29'),
('2021/0001','MC1100','MC/ASS01',65,'2021-07-15 16:05:29'),
('2021/0002','MC1100','MC/ASS01',55,'2021-07-15 16:05:29'),
('2021/0003','MC1100','MC/ASS01',63,'2021-07-15 16:05:29'),
('2021/0004','MC1100','MC/ASS01',90,'2021-07-15 16:05:29'),
('2021/0005','MC1100','MC/ASS01',21,'2021-07-15 16:05:29'),
('2021/0006','CE2021','CE/ASS01',45,'2021-09-20 14:05:29'),
('2021/0005','CE2021','CE/ASS01',95,'2021-09-20 14:05:29'),
('2021/0004','CE2021','CE/ASS01',61,'2021-09-20 14:05:29'),
('2021/0010','CE2021','CE/ASS01',12,'2021-09-20 14:05:29'),
('2021/0009','CE2021','CE/ASS01',82,'2021-09-20 14:05:29'),
('2021/0008','CE2021','CE/ASS01',67,'2021-09-20 14:05:29'),
('2021/0012','CE2021','CE/ASS01',63,'2021-09-20 14:05:29'),
('2021/0016','CE2021','CE/ASS01',64,'2021-09-20 14:05:29'),
('2021/0017','CE2021','CE/ASS01',92,'2021-09-20 14:05:29'),
('2021/0018','CE2021','CE/ASS01',80,'2021-09-20 14:05:29'),
('2021/0019','CE2021','CE/ASS01',20,'2021-09-20 14:05:29'),
('2021/0028','CE2021','CE/ASS01',86,'2021-09-20 14:05:29'),
('2021/0036','CE2021','CE/ASS01',83,'2021-09-20 14:05:29'),
('2021/0035','CE2021','CE/ASS01',83,'2021-09-20 14:05:29'),
('2021/0037','CE2021','CE/ASS01',96,'2021-09-20 14:05:29'),
('2021/0038','CE2021','CE/ASS01',45,'2021-09-20 14:05:29'),
('2021/0039','CE2021','CE/ASS01',65,'2021-09-20 14:05:29'),
('2021/0040','CE2021','CE/ASS01',83,'2021-09-20 14:05:29'),
('2021/0041','CE2021','CE/ASS01',91,'2021-09-20 14:05:29'),
('2021/0042','CE2021','CE/ASS01',70,'2021-09-20 14:05:29'),
('2021/0043','CE2021','CE/ASS01',91,'2021-09-20 14:05:29'),
('2021/0044','CE2021','CE/ASS01',33,'2021-09-20 14:05:29'),
('2021/0045','CE2021','CE/ASS01',33,'2021-09-20 14:05:29'),
('2021/0046','CE2021','CE/ASS01',34,'2021-09-20 14:05:29'),
('2021/0047','CE2021','CE/ASS01',49,'2021-09-20 14:05:29'),
('2021/0048','CE2021','CE/ASS01',69,'2021-09-20 14:05:29'),
('2021/0049','CE2021','CE/ASS01',73,'2021-09-20 14:05:29'),
('2021/0050','CE2021','CE/ASS01',56,'2021-09-20 14:05:29'),
('2021/0013','CE2021','CE/ASS01',58,'2021-09-20 14:05:29'),
('2021/0014','CE2021','CE/ASS01',83,'2021-09-20 14:05:29'),
('2021/0014','MC2010','MC/QUI01',85,'2021-09-22 14:00:00'),
('2021/0001','MC2010','MC/QUI01',56,'2021-09-22 14:00:00'),
('2021/0002','MC2010','MC/QUI01',54,'2021-09-22 14:00:00'),
('2021/0003','MC2010','MC/QUI01',78,'2021-09-22 14:00:00'),
('2021/0004','MC2010','MC/QUI01',98,'2021-09-22 14:00:00'),
('2021/0005','MC2010','MC/QUI01',12,'2021-09-22 14:00:00'),
('2021/0006','MC2010','MC/QUI01',56,'2021-09-22 14:00:00'),
('2021/0007','MC2010','MC/QUI01',57,'2021-09-22 14:00:00'),
('2021/0008','MC2010','MC/QUI01',87,'2021-09-22 14:00:00'),
('2021/0009','MC2010','MC/QUI01',80,'2021-09-22 14:00:00'),
('2021/0010','MC2010','MC/QUI01',83,'2021-09-22 14:00:00'),
('2021/0040','MC2010','MC/QUI01',89,'2021-09-22 14:00:00'),
('2021/0041','MC2010','MC/QUI01',95,'2021-09-22 14:00:00'),
('2021/0042','MC2010','MC/QUI01',93,'2021-09-22 14:00:00'),
('2021/0043','MC2010','MC/QUI01',91,'2021-09-22 14:00:00'),
('2021/0044','MC2010','MC/QUI01',21,'2021-09-22 14:00:00'),
('2021/0045','MC2010','MC/QUI01',25,'2021-09-22 14:00:00'),
('2021/0047','MC2010','MC/QUI01',29,'2021-09-22 14:00:00'),
('2021/0048','MC2010','MC/QUI01',23,'2021-09-22 14:00:00'),
('2021/0049','MC2010','MC/QUI01',78,'2021-09-22 14:00:00'),
('2021/0050','MC2010','MC/QUI01',79,'2021-09-22 14:00:00'),
('2021/0020','MC2010','MC/QUI01',93,'2021-09-22 14:00:00'),
('2021/0021','MC2010','MC/QUI01',91,'2021-09-22 14:00:00'),
('2021/0022','MC2010','MC/QUI01',33,'2021-09-22 14:00:00'),
('2021/0023','MC2010','MC/QUI01',37,'2021-09-22 14:00:00'),
('2021/0024','MC2010','MC/QUI01',39,'2021-09-22 14:00:00'),
('2021/0025','MC2010','MC/QUI01',93,'2021-09-22 14:00:00'),
('2021/0026','MC2010','MC/QUI01',49,'2021-09-22 14:00:00'),
('2021/0027','MC2010','MC/QUI01',42,'2021-09-22 14:00:00'),
('2021/0028','MC2010','MC/QUI01',40,'2021-09-22 14:00:00'),
('2021/0029','MC2010','MC/QUI01',52,'2021-09-22 14:00:00'),
('2021/0030','MC2010','MC/QUI01',55,'2021-09-22 14:00:00'),
('2021/0035','MC2010','MC/QUI01',66,'2021-09-22 14:00:00'),
('2021/0034','MC2010','MC/QUI01',44,'2021-09-22 14:00:00'),
('2021/0036','MC2010','MC/QUI01',93,'2021-09-22 14:00:00'),
('2021/0013','MC2010','MC/QUI01',69,'2021-09-22 14:00:00'),
('2021/0015','MC2010','MC/QUI01',47,'2021-09-22 14:00:00'),
('2021/0016','MC2010','MC/QUI01',58,'2021-09-22 14:00:00'),
('2021/0017','MC2010','MC/QUI01',52,'2021-09-22 14:00:00'),
('2021/0018','MC2010','MC/QUI01',56,'2021-09-22 14:00:00'),
('2021/0019','MC2010','MC/QUI01',20,'2021-09-22 14:00:00'),
('2021/0039','MC2010','MC/QUI01',46,'2021-09-22 14:00:00'),
('2021/0001','MC1101','MC/ASS01',96,'2021-09-19 12:05:29'),
('2021/0002','MC1101','MC/ASS01',66,'2021-09-19 12:05:29'),
('2021/0010','MC1101','MC/ASS01',26,'2021-09-19 12:05:29'),
('2021/0003','MC1101','MC/ASS01',65,'2021-09-19 12:05:29'),
('2021/0009','MC1101','MC/ASS01',89,'2021-09-19 12:05:29'),
('2021/0008','MC1101','MC/ASS01',69,'2021-09-19 12:05:29'),
('2021/0011','MC1101','MC/ASS01',96,'2021-09-19 12:05:29'),
('2021/0012','MC1101','MC/ASS01',63,'2021-09-19 12:05:29'),
('2021/0020','MC1101','MC/ASS01',12,'2021-09-19 12:05:29'),
('2021/0023','MC1101','MC/ASS01',23,'2021-09-19 12:05:29'),
('2021/0029','MC1101','MC/ASS01',65,'2021-09-19 12:05:29'),
('2021/0028','MC1101','MC/ASS01',61,'2021-09-19 12:05:29'),
('2021/0021','MC1101','MC/ASS01',69,'2021-09-19 12:05:29'),
('2021/0022','MC1101','MC/ASS01',78,'2021-09-19 12:05:29'),
('2021/0030','MC1101','MC/ASS01',80,'2021-09-19 12:05:29'),
('2021/0033','MC1101','MC/ASS01',89,'2021-09-19 12:05:29'),
('2021/0034','MC1101','MC/ASS01',97,'2021-09-19 12:05:29'),
('2021/0035','MC1101','MC/ASS01',90,'2021-09-19 12:05:29'),
('2021/0036','MC1101','MC/ASS01',63,'2021-09-19 12:05:29'),
('2021/0037','MC1101','MC/ASS01',53,'2021-09-19 12:05:29'),
('2021/0038','MC1101','MC/ASS01',23,'2021-09-19 12:05:29'),
('2021/0039','MC1101','MC/ASS01',64,'2021-09-19 12:05:29'),
('2021/0040','MC1101','MC/ASS01',97,'2021-09-19 12:05:29'),
('2021/0041','MC1101','MC/ASS01',89,'2021-09-19 12:05:29'),
('2021/0042','MC1101','MC/ASS01',94,'2021-09-19 12:05:29'),
('2021/0043','MC1101','MC/ASS01',85,'2021-09-19 12:05:29'),
('2021/0044','MC1101','MC/ASS01',81,'2021-09-19 12:05:29'),
('2021/0045','MC1101','MC/ASS01',83,'2021-09-19 12:05:29'),
('2021/0046','MC1101','MC/ASS01',89,'2021-09-19 12:05:29'),
('2021/0047','MC1101','MC/ASS01',87,'2021-09-19 12:05:29'),
('2021/0048','MC1101','MC/ASS01',15,'2021-09-19 12:05:29');



DELIMITER $$

DROP PROCEDURE IF EXISTS `sp_read_Courses`$$ 
CREATE  PROCEDURE `sp_read_Courses` ()  BEGIN 
select c.Course, c.Course_id, CONCAT(e.Fname,' ',e.Minit,' ',e.Lname)AS iname 
from COURSE c LEFT JOIN EMPLOYEE e
ON e.E_id=c.Instructor_id; 
END$$ 

DROP PROCEDURE IF EXISTS `sp_read_Instructors`$$ 
CREATE  PROCEDURE `sp_read_Instructors` ()  BEGIN 
select CONCAT(e.Fname,' ',e.Minit,' ',e.Lname)AS iname, e.Education_status
from COURSE c,EMPLOYEE e
WHERE e.E_id=c.Instructor_id; 
END$$ 

DROP PROCEDURE IF EXISTS `sp_read_a_Course`$$ 
CREATE  PROCEDURE `sp_read_a_Course` (`cid` CHAR(15))  BEGIN 
select c.Course, CONCAT(e.Fname,' ',e.Minit,' ',e.Lname)AS iname 
from COURSE c LEFT JOIN EMPLOYEE e
ON (e.E_id=c.Instructor_id)
where c.Course_id=cid; 
END$$ 

DROP PROCEDURE IF EXISTS `sp_read_Ass`$$ 
CREATE  PROCEDURE `sp_read_Ass` (IN `course_code` CHAR(15))  BEGIN 
select ass.Ass_id, ass.Assessment, CONCAT(sup.Fname,' ',sup.Minit,' ',sup.Lname) as Supervisor, 
	CONCAT(assesor.Fname,' ',assesor.Minit,' ',assesor.Lname) as Assessor, ass.Scheduled_date, cs.Course
FROM EMPLOYEE sup RIGHT JOIN ASSESSMENT ass ON ( sup.E_id=ass.Supervisor_id)
LEFT JOIN EMPLOYEE assesor ON (assesor.E_id=ass.Assessor_id)
INNER JOIN COURSE cs on (ass.Course_id=cs.Course_id)
WHERE cs.Course_id=course_code
ORDER BY DATE(ass.Scheduled_date) DESC; 
END$$ 



DROP PROCEDURE IF EXISTS `sp_view_results`$$ 
CREATE  PROCEDURE `sp_view_results` (`sid` CHAR(11))  BEGIN 
SELECT c.Course,a.Assessment,m.Marks, CONCAT(e.Fname,' ',e.Minit,' ',e.Lname) as Course_Instructor,e.email
FROM EMPLOYEE e RIGHT JOIN COURSE c ON e.E_id=c.Instructor_id 
INNER JOIN ASSESSMENT a ON a.Course_id=c.Course_id
INNER JOIN RESULT_REPORT m ON (m.Course_id = a.Course_id AND m.Ass_id = a.Ass_id AND m.Student_reg_no=sid)
ORDER BY DATE(m.Updated_date) DESC;
END$$ 

DROP PROCEDURE IF EXISTS `sp_log_to_view_result`$$ 
CREATE  PROCEDURE `sp_log_to_view_result` () BEGIN 
SELECT s.Reg_no, CONCAT(s.Fname,' ',s.Minit,' ',s.Lname) AS sname,g.Guardian_name, g.G_login_code, s.S_login_code
FROM STUDENT s LEFT JOIN GUARDIAN g 
ON s.Reg_no=g.Student_reg_no;
END$$ 


DROP PROCEDURE IF EXISTS `sp_assessor_login`$$ 
CREATE  PROCEDURE `sp_assessor_login` () BEGIN 
select a.Course_id, a.Ass_id, a.Assessor_id, a.Ass_login_code,  c.Course, a.Assessment, e.Password,
CONCAT(i.Fname,' ',i.Minit,' ',i.Lname) AS iname, CONCAT(e.Fname,' ',e.Minit,' ',e.Lname) AS aname
from EMPLOYEE i RIGHT JOIN COURSE c ON (i.E_id=c.Instructor_id)
INNER JOIN ASSESSMENT a ON (a.Course_id = c.Course_id)
LEFT JOIN EMPLOYEE e ON (e.E_id=a.Assessor_id);
END$$

DROP PROCEDURE IF EXISTS `sp_instructor_login`$$ 
CREATE  PROCEDURE `sp_instructor_login` () BEGIN 
select c.Course_id, c.Instructor_id, c.Ass_crud_code,  c.Course, i.Password,
CONCAT(i.Fname,' ',i.Minit,' ',i.Lname) AS iname
from COURSE c, EMPLOYEE i
WHERE i.E_id=c.Instructor_id;
END$$

DROP PROCEDURE IF EXISTS `sp_results`$$ 
CREATE  PROCEDURE `sp_results` (cid CHAR(15), aid CHAR(15)) BEGIN 
select Student_reg_no, Marks, Updated_date
from RESULT_REPORT
WHERE Course_id = cid AND Ass_id = aid;
END$$



DROP PROCEDURE IF EXISTS `sp_update_result`$$ 
CREATE  PROCEDURE `sp_update_result` (cid CHAR(15), aid CHAR(15),sid CHAR(11),marks INT) BEGIN 
update RESULT_REPORT 
set Marks=marks, Updated_date=CURRENT_TIMESTAMP()
where Student_reg_no=sid AND Course_id = cid AND Ass_id = aid; 
END$$

DROP PROCEDURE IF EXISTS `sp_update_stdDB`$$ 
CREATE  PROCEDURE `sp_update_stdDB` (stdID CHAR(15), fName CHAR(150),minit CHAR,lName VARCHAR(150),sex CHAR, dob DATE,address VARCHAR(255),loginCode CHAR(8)) BEGIN 
update STUDENT 
set Fname=fName,Minit=minit,Lname=lName,Sex=sex,DOB=dob,Address=address,S_login_code=loginCode
where Reg_no=stdID; 
END$$
DROP PROCEDURE IF EXISTS `sp_update_courseDB`$$ 
CREATE  PROCEDURE `sp_update_courseDB` (courseId CHAR(15), course CHAR(150),instructor CHAR(11),loginCode CHAR(16)) BEGIN 
update COURSE 
set Course=course,Instructor_id=instructor,Ass_crud_code=loginCode
where Course_id=courseId; 
END$$

DROP PROCEDURE IF EXISTS `sp_insert_courseDB`$$ 
CREATE  PROCEDURE `sp_insert_courseDB` (courseId CHAR(15), course CHAR(150),instructor CHAR(11),loginCode CHAR(16)) BEGIN 
insert into COURSE(Course_id,Course,Instructor_id,Ass_crud_code) 
value (courseId,course,instructor,loginCode);
END$$

DROP PROCEDURE IF EXISTS `sp_update_employeeDB`$$ 
CREATE  PROCEDURE `sp_update_employeeDB` (empID CHAR(15), fName CHAR(150),minit CHAR,lName VARCHAR(150),sex CHAR, dob DATE,e_mail VARCHAR(120),eduStatus VARCHAR(200),loginCode CHAR(8)) BEGIN 
update EMPLOYEE 
set Fname=fName,Minit=minit,Lname=lName,Sex=sex,DOB=dob,email=e_mail,Education_status=eduStatus,Password=loginCode
where E_id=empID; 
END$$

DROP PROCEDURE IF EXISTS `sp_insert_employeeDB`$$ 
CREATE  PROCEDURE `sp_insert_employeeDB` (empID CHAR(15), fName CHAR(150),minit CHAR,lName VARCHAR(150),sex CHAR, dob DATE,e_mail VARCHAR(120),eduStatus VARCHAR(200),loginCode CHAR(8)) BEGIN 
insert into EMPLOYEE(E_id,Fname,Minit,Lname,Sex,DOB,email,Education_status,Password) 
value (empID,fName,minit,lName,sex,dob,e_mail,eduStatus,loginCode);
END$$


DROP PROCEDURE IF EXISTS `sp_update_guardianDB`$$ 
CREATE  PROCEDURE `sp_update_guardianDB` (stdID CHAR(15), fName CHAR(150),relationship VARCHAR(150),contactNo CHAR(11),loginCode CHAR(8)) BEGIN 
update GUARDIAN 
set Guardian_name=fName,Relationship=relationship,ContactNumber=contactNo,G_login_code=loginCode
where Student_reg_no=stdID; 
END$$

DROP PROCEDURE IF EXISTS `sp_insert_guardianDB`$$ 
CREATE  PROCEDURE `sp_insert_guardianDB` (stdID CHAR(15), fName CHAR(150),relationship VARCHAR(150),contactNo CHAR(11),loginCode CHAR(8)) BEGIN 
insert into GUARDIAN(Student_reg_no,Guardian_name,Relationship,ContactNumber,G_login_code) 
value (stdID,fName,relationship,contactNo,loginCode);
END$$


DROP PROCEDURE IF EXISTS `sp_delete_result`$$ 
CREATE  PROCEDURE `sp_delete_result` (sid CHAR(11),cid CHAR(15), aid CHAR(15)) BEGIN 
DELETE 
FROM RESULT_REPORT
where Student_reg_no=sid AND Course_id = cid AND Ass_id = aid; 
END$$

DROP PROCEDURE IF EXISTS `sp_delete_studentDB`$$ 
CREATE  PROCEDURE `sp_delete_studentDB` (sid CHAR(11)) BEGIN 
DELETE 
FROM RESULT_REPORT
where Student_reg_no=sid; 
DELETE 
FROM GUARDIAN
where Student_reg_no=sid ; 
DELETE 
FROM STUDENT
where Reg_no=sid ; 
END$$

DROP PROCEDURE IF EXISTS `sp_delete_courseDB`$$ 
CREATE  PROCEDURE `sp_delete_courseDB` (sid CHAR(11)) BEGIN 
DELETE 
FROM RESULT_REPORT
where Course_id=sid; 
DELETE 
FROM ASSESSMENT
where Course_id=sid ; 
DELETE 
FROM COURSE
where Course_id=sid ; 
END$$

DROP PROCEDURE IF EXISTS `sp_delete_employeeDB`$$ 
CREATE  PROCEDURE `sp_delete_employeeDB` (sid CHAR(11)) BEGIN 
update ASSESSMENT 
set Assessor_id=NULL
where Assessor_id=sid; 
update ASSESSMENT 
set Supervisor_id=NULL
where Supervisor_id=sid; 
update COURSE 
set Instructor_id=NULL
where Instructor_id=sid; 
DELETE 
FROM EMPLOYEE
where E_id=sid; 
END$$

DROP PROCEDURE IF EXISTS `sp_delete_guardianDB`$$ 
CREATE  PROCEDURE `sp_delete_guardianDB` (sid CHAR(11), gName VARCHAR(150)) BEGIN 
DELETE 
FROM GUARDIAN
where Student_reg_no=sid AND Guardian_name=gName; 
END$$



DROP PROCEDURE IF EXISTS `sp_asses_insert`$$ 
CREATE  PROCEDURE `sp_asses_insert` (cid CHAR(15),aid CHAR(15),Assess VARCHAR(150),supid CHAR(11),
asid CHAR(11),sdate timestamp,login CHAR(12))  
BEGIN insert into ASSESSMENT(Course_id,Ass_id,Assessment,Supervisor_id,Assessor_id,Scheduled_date,Ass_login_code) 
value(cid,aid,Assess,supid,asid,sdate,login); 
END$$ 


DROP PROCEDURE IF EXISTS `sp_insert_stdDB`$$ 
CREATE  PROCEDURE `sp_insert_stdDB` (stdID CHAR(15), fName CHAR(15),minit CHAR(11),lName VARCHAR(150),sex CHAR, dob DATE,address VARCHAR(255),loginCode CHAR(8), gName CHAR(150),relationship VARCHAR(150),contactNo CHAR(11),gloginCode CHAR(8)) BEGIN 
insert into STUDENT(Reg_no,Fname,Minit,Lname,Sex,DOB,Address,S_login_code) 
value (stdID,fName,minit,lName,sex,dob,address,loginCode);
insert into GUARDIAN(Student_reg_no,Guardian_name,Relationship,ContactNumber,G_login_code) 
value (stdID,gName,relationship,contactNo,gloginCode);
END$$

DROP PROCEDURE IF EXISTS `sp_read_assessment`$$ 
CREATE  PROCEDURE `sp_read_assessment` (cid CHAR(15))  
BEGIN 
select a.Ass_id, a.Assessment, CONCAT(e.E_id,' | ',e.Fname,' ',e.Minit,' ',e.Lname) AS aname, a.Supervisor_id, a.Assessor_id, 
CONCAT(s.E_id,' | ',s.Fname,' ',s.Minit,' ',s.Lname) AS sname, a.Scheduled_date, a.Ass_login_code
from EMPLOYEE s RIGHT JOIN ASSESSMENT a ON (a.Supervisor_id=s.E_id)
LEFT JOIN EMPLOYEE e ON (a.Assessor_id=e.E_id)
where a.Course_id = cid
ORDER BY DATE(a.Scheduled_date) DESC; 
END$$


DROP PROCEDURE IF EXISTS `sp_update_assess`$$ 
CREATE  PROCEDURE `sp_update_assess` (cid CHAR(15),aid CHAR(15),Assess VARCHAR(150),supid CHAR(11),
asid CHAR(11),sdate timestamp,login CHAR(12)) BEGIN 
update ASSESSMENT 
set Assessment=Assess, Supervisor_id=supid,Assessor_id=asid,Scheduled_date=sdate,Ass_login_code=login
where Course_id = cid AND Ass_id = aid AND 
(SELECT E_id from EMPLOYEE where E_id=supid)=supid AND
(SELECT E_id from EMPLOYEE where E_id=asid)=asid; 
END$$

DROP PROCEDURE IF EXISTS `sp_update_resultDB`$$ 
CREATE  PROCEDURE `sp_update_resultDB` (cid CHAR(15), aid CHAR(15),sid CHAR(11),marks INT, updated timestamp) BEGIN 
update RESULT_REPORT 
set Marks=marks, Updated_date=updated
where Student_reg_no=sid AND Course_id = cid AND Ass_id = aid; 
END$$


DROP PROCEDURE IF EXISTS `sp_delete_assess`$$ 
CREATE  PROCEDURE `sp_delete_assess` (cid CHAR(15),aid CHAR(15),sup CHAR(15),asse CHAR(15))   BEGIN 
DELETE 
FROM ASSESSMENT
where Course_id = cid AND Ass_id = aid AND
Supervisor_id IN(SELECT E_id from EMPLOYEE where E_id=sup) AND
Assessor_id IN(SELECT E_id from EMPLOYEE where E_id=asse); 
END$$

DROP PROCEDURE IF EXISTS `sp_delete_assessmentDB`$$ 
CREATE  PROCEDURE `sp_delete_assessmentDB` (cid CHAR(15),aid CHAR(15))   BEGIN 
DELETE 
FROM RESULT_REPORT
where Course_id = cid AND Ass_id = aid; 
DELETE 
FROM ASSESSMENT
where Course_id = cid AND Ass_id = aid ;
END$$


 

DROP PROCEDURE IF EXISTS `sp_result_insert`$$ 
CREATE  PROCEDURE `sp_result_insert` (stid CHAR(11),cid CHAR(15), aid CHAR(15),marks INT)  
BEGIN insert into RESULT_REPORT(Student_reg_no,Course_id,Ass_id,Marks,Updated_date) 
value(stid,cid,aid,marks,CURRENT_TIMESTAMP()); 
END$$ 

DROP PROCEDURE IF EXISTS `sp_student_db`$$ 
CREATE  PROCEDURE `sp_student_db` () BEGIN 
select *
from STUDENT;
END$$
DROP PROCEDURE IF EXISTS `sp_guardian_db`$$ 
CREATE  PROCEDURE `sp_guardian_db` () BEGIN 
select *
from GUARDIAN;
END$$
DROP PROCEDURE IF EXISTS `sp_employee_db`$$ 
CREATE  PROCEDURE `sp_employee_db` () BEGIN 
select *
from EMPLOYEE;
END$$
DROP PROCEDURE IF EXISTS `sp_course_db`$$ 
CREATE  PROCEDURE `sp_course_db` () BEGIN 
select *
from COURSE;
END$$
DROP PROCEDURE IF EXISTS `sp_assessment_db`$$ 
CREATE  PROCEDURE `sp_assessment_db` () BEGIN 
select *
from ASSESSMENT;
END$$
DROP PROCEDURE IF EXISTS `sp_result_db`$$ 
CREATE  PROCEDURE `sp_result_db` () BEGIN 
select *
from RESULT_REPORT;
END$$


DELIMITER ;

