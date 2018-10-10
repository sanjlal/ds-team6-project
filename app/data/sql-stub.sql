use Team6DB;
create table sensor (
	sensorId INT auto_increment not null,
    sensorName VARCHAR(50) not null,
    sensorDescription VARCHAR(50),
    manufacturer VARCHAR(50) not null,
    totalLifeExpentancyHours INT not null,
    primary key (sensorId)
);

create table client (
	clientId INT auto_increment not null,
    clientName VARCHAR(100) not null,
    clientDescription VARCHAR(500),
    gicsSector VARCHAR(50) not null,
    gicsSubIndustry VARCHAR(50) not null,
    headquarters VARCHAR(50) not null,
    primary key (clientId)
);

create table turbine (
	turbineId INT auto_increment not null,
    turbineName VARCHAR(100) not null,
    turbineDescription VARCHAR(500),
    capacity INT not null,
    rampUpTime INT not null,
    maintenanceInterval INT not null,
    primary key (turbineId)
);

create table site(
	siteId INT auto_increment not null,
    clientId INT not null,
    siteName VARCHAR(50) not null,
    siteDescription VARCHAR(100) not null,
    primaryContact VARCHAR(50) not null,
    capacity INT not null,
    commercialDate date,
    addrLine1 VARCHAR(100) not null,
    addrLine2 VARCHAR(100),
    addrCity VARCHAR(50) not null,
    addrState VARCHAR(10) not null,
    addrZip INT not null,
    addrCountry VARCHAR(50) not null,
    primary key(siteId),
    FOREIGN KEY (clientId)
			references client(clientId)
);


create table turbineDeployed(
	turbineDeployedId INT auto_increment not null,
    turbineId INT not null,
    siteId INT not null,
    serialNumber VARCHAR(100) not null,
    deployedDate date,
    totalFiredHours INT not null,
    totalStarts INT not null,
    lastPlannedOutageDate date,
    lastUnplannedOutageDate date,
    primary key(turbineDeployedId),
    FOREIGN KEY (turbineId)
			references turbine(turbineId),
	FOREIGN KEY (siteId)
			references site(siteId)
);

create table sensorDeployed(
	sensorDeployedId INT auto_increment not null,
    sensorId INT not null,
    turbineDeployedId INT not null,
    serialNumber VARCHAR(50) not null,
    deployedDate date,
    primary key(sensorDeployedId),
    FOREIGN KEY (sensorId)
			references sensor(sensorId),
    FOREIGN KEY (turbineDeployedId)
			references turbineDeployed(turbineDeployedId)
);

create table sensorTimeSeries(
	sensorDeployedId INT not null,
    dataCollectedDate date,
    output double(12,8),
    heatRate double(30,8),
    compressorEfficiency double(12,8),
    availability double(12,8),
    reliability double(12,8),
    firedHours double(12,8),
    trips INT not null,
    starts INT not null,
    FOREIGN KEY (sensorDeployedId)
			references sensorDeployed(sensorDeployedId)
    );
