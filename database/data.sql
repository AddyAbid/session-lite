insert into "users" ("userId", "username", "email", "password")
values (1, 'admin', 'admin@gmail.com', 'admin1');

insert into "posts" ("postId", "userId", "description", "title", "price", "imgUrl")
values (1, 1, 'this is a test description', 'this is a test title', '50', '/images/image-1640629175718.png'),
(2, 1, 'this is a test description 2', 'this is a test title 2', '275','/images/image-1640629175718.png');
