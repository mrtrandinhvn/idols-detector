CREATE TABLE Country
(
	CountryId		int IDENTITY(1,1),
	CountryName		nvarchar(150) NOT NULL,
	ISOCode			varchar(5)
	CONSTRAINT pk_Country PRIMARY KEY(CountryId)
)
ALTER TABLE Country ADD CONSTRAINT u_Country_1 UNIQUE(ISOCode)
GO
CREATE TABLE PersonGroup
(
	PersonGroupId	int IDENTITY(1,1),
	PersonGroupOnlineId varchar(64) NOT NULL,  -- lowercase, - or _ 
	TrainingStatus varchar(50),
	CONSTRAINT pk_PersonGroup PRIMARY KEY (PersonGroupId),
	CONSTRAINT u_PersonGroup_1 UNIQUE(PersonGroupOnlineId)
)
GO

CREATE TABLE Person
(
	PersonId		int IDENTITY(1,1),
	PersonOnlineId	uniqueidentifier	NOT NULL,
	PersonGroupId	int					NOT NULL,
	Name			nvarchar(150)		NOT NULL,
	BirthDate		date,
	Alias			nvarchar(150),
	Height			float,
	EyeColor		varchar(50),
	HairColor		varchar(50),
	CountryId		int
CONSTRAINT pk_Person PRIMARY KEY (PersonId),
CONSTRAINT fk_PersonGroup_Person FOREIGN KEY (PersonGroupId) REFERENCES PersonGroup(PersonGroupId),
CONSTRAINT fk_PersonGroup_Country FOREIGN KEY(CountryId) REFERENCES Country(CountryId),
CONSTRAINT u_Person_1 UNIQUE(PersonOnlineId),
CONSTRAINT u_Person_2 UNIQUE(PersonGroupId,Name, Alias) -- In 1 group, the values of a pair (name,alias) are unique
)
GO

CREATE TABLE Face -- PersistedFace
(
	FaceId			int IDENTITY(1,1),
	FaceOnlineId	uniqueidentifier NOT NULL,
	PersonId		int NOT NULL,
	ImageUrl		nvarchar(max)
	CONSTRAINT pk_Face_FaceId PRIMARY KEY (FaceId),
	CONSTRAINT u_Face_1 UNIQUE(FaceOnlineId),
	CONSTRAINT u_Face_2 UNIQUE(FaceOnlineId, PersonId),
	CONSTRAINT fk_Person_Face FOREIGN KEY (PersonId) REFERENCES Person(PersonId)
)
GO