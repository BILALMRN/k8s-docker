

create TABLE categories (
    category_id (Primary Key) INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL, 
    description VARCHAR(200) ,
)


create TABLE photos (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    PhotoProduct_id INT NOT NULL,--generate id for store multiple image with same id 
    user_id INT (Foreign Key) -- if account is delete, delete all photo from storage
    url VARCHAR(2000),
);


create TABLE products (
    product_id (Primary Key) INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
    admin_id (Foreign Key),
    nameProduct VARCHAR(50) NOT NULL, 
    description text, 
    price float NOT NULL,  
    stock INT NOT NULL,
    mainPhoto VARCHAR(2000) NOT NULL ,
    subPhotoProduct_id (Foreign Key),
    category_id (Foreign Key), 
    created_at Date, 
    updated_at Date,
)