BEGIN
    IF DB_ID(N'autosalon_db') IS NULL BEGIN
        CREATE DATABASE [autosalon_db]
        PRINT N'База данных autosalon_db создана'
    END ELSE
        PRINT N'База данных autosalon_db уже существует'
END
GO

USE [autosalon_db]
GO

BEGIN
    IF OBJECT_ID(N'tehnical_data') IS NULL BEGIN
        CREATE TABLE [tehnical_data](
        [id_tehnical] INT NOT NULL IDENTITY,
        [type_bodywork] NVARCHAR(50) NOT NULL,
        [number_door] INT NOT NULL,
        [number_place] INT NOT NULL,
        [type_engine] INT NOT NULL,
        [engine_location] INT NOT NULL,
        [engine_displacement] DECIMAL NOT NULL,

        CONSTRAINT [PR_tehnical_id] PRIMARY KEY([id_tehnical])
        )
        PRINT N'Таблица tehnical_data создана'
    END ELSE 
        PRINT N'Таблица tehnical_data уже существует'
END
GO

BEGIN
    IF OBJECT_ID(N'product') IS NULL BEGIN
        CREATE TABLE [product](
        [id_product] INT NOT NULL IDENTITY,
        [county_manufacturer] NVARCHAR(50) NOT NULL,
        [marka_car] NVARCHAR(50) NOT NULL,
        [model_car] NVARCHAR(100) NOT NULL,
        [availability] INT NOT NULL,
        [price] MONEY NOT NULL,
        [id_tehnical] INT NOT NULL,

        CONSTRAINT [PK_product_id] PRIMARY KEY([id_product]),
        CONSTRAINT [FK_car_tehnical] FOREIGN KEY([id_tehnical])
            REFERENCES [tehnical_data]([id_tehnical])
        )
        PRINT N'Таблица product создана'
    END ELSE 
        PRINT N'Таблица product уже существует'
END
GO

BEGIN
    IF OBJECT_ID(N'client') IS NULL BEGIN
        CREATE TABLE [client](
        [id_client] INT NOT NULL IDENTITY,
        [first_name] NVARCHAR(20) NOT NULL,
        [middle_name] NVARCHAR(30) NOT NULL,
        [last_name] NVARCHAR(30) NULL,
        [passport_series] INT NOT NULL,
        [passport_number] INT NOT NULL,
        [home_address] NVARCHAR(40) NOT NULL,
        [number] NVARCHAR(20) NOT NULL,
        [delivery] BIT NOT NULL,
        [type_payment] INT NOT NULL,
        [id_product] INT NOT NULL,

        CONSTRAINT [PK_client_id] PRIMARY KEY ([id_client]),
        CONSTRAINT [FK_client_car] FOREIGN KEY ([id_product])
            REFERENCES [product]([id_product])
        )
        PRINT N'Таблица client создана'
    END ELSE
        PRINT N'Таблица client уже существует'
END
GO

-- Заполнение таблицы tehnical_data
BEGIN
    SET IDENTITY_INSERT [tehnical_data] ON
    
    INSERT INTO [tehnical_data] 
        ([id_tehnical], [type_bodywork], [number_door], [number_place], [type_engine], [engine_location], [engine_displacement])
    VALUES
        (1, N'Купе', 2, 4, 1, 1, 3.0),
        (2, N'Седан', 4, 5, 2, 1, 2.5),
        (3, N'Внедорожник', 5, 7, 3, 1, 3.5),
        (4, N'Хэтчбек', 5, 5, 1, 1, 1.8),
        (5, N'Кабриолет', 2, 4, 2, 1, 2.0)
    
    SET IDENTITY_INSERT [tehnical_data] OFF
    PRINT N'Данные добавлены в tehnical_data'
END
GO

-- Заполнение таблицы product
BEGIN
    SET IDENTITY_INSERT [product] ON
    
    INSERT INTO [product]
        ([id_product], [county_manufacturer], [marka_car], [model_car], [availability], [price], [id_tehnical])
    VALUES
        (1, N'Япония', N'Toyota', N'Supra', 0, 2000000, 1),
        (2, N'Германия', N'BMW', N'M5', 3, 3500000, 2),
        (3, N'США', N'Jeep', N'Grand Cherokee', 0, 2800000, 3),
        (4, N'Германия', N'Volkswagen', N'Golf', 1, 1200000, 4),
        (5, N'Италия', N'Ferrari', N'Portofino', 2, 8500000, 5)
    
    SET IDENTITY_INSERT [product] OFF
    PRINT N'Данные добавлены в product'
END
GO

-- Заполнение таблицы client
BEGIN
    SET IDENTITY_INSERT [client] ON
    
    INSERT INTO [client]
        ([id_client], [first_name], [middle_name], [last_name], [passport_series], [passport_number], 
         [home_address], [number], [delivery], [type_payment], [id_product])
    VALUES
        (1, N'Иван', N'Иванович', N'Иванов', 1234, 567890, N'ул. Ленина, 10', '+79101234567', 1, 1,  1),
        (2, N'Петр', N'Петрович', N'Петров', 2345, 678901, N'ул. Пушкина, 5', '+79211234567', 0, 2,  2),
        (3, N'Сергей', N'Сергеевич', N'Сергеев', 3456, 789012, N'ул. Гагарина, 15', '+79311234567', 1, 1,  3),
        (4, N'Анна', N'Андреевна', N'Андреева', 4567, 890123, N'ул. Садовая, 20', '+79411234567', 0, 3,  4),
        (5, N'Мария', N'Викторовна', NULL, 5678, 901234, N'ул. Лесная, 30', '+79511234567', 1, 2,  5)
    
    SET IDENTITY_INSERT [client] OFF
    PRINT N'Данные добавлены в client'
END
GO