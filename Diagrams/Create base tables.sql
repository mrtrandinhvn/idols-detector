CREATE TABLE PersonGroup
(
PersonGroupId varchar(64) NOT NULL,  -- lowercase, - or _ 
TrainingStatus varchar(50),
CONSTRAINT pk_PersonGroup_PersonGroupId PRIMARY KEY (PersonGroupId)
)
GO

CREATE TABLE Person
(
PersonId		uniqueidentifier NOT NULL,
PersonGroupId	varchar(64) NOT NULL,
Name			nvarchar(150) NOT NULL,
BirthDate		date,
Alias			nvarchar(150),
Height			float,
EyeColor		varchar(50),
HairColor		varchar(50),
CountryId		int
CONSTRAINT pk_Person_PersonId PRIMARY KEY (PersonId),
CONSTRAINT fk_PersonGroup_Person FOREIGN KEY (PersonGroupId) REFERENCES PersonGroup(PersonGroupId)
)
GO

CREATE TABLE Face
(
FaceId			uniqueidentifier NOT NULL,
PersonId		uniqueidentifier NOT NULL,
ImageUrl		nvarchar(max)
CONSTRAINT pk_Face_FaceId PRIMARY KEY (FaceId),
CONSTRAINT fk_Person_Face FOREIGN KEY (PersonId) REFERENCES Person(PersonId)
)
GO