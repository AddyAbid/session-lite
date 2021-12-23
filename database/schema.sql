set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

 CREATE TABLE "public.Users" (
	"userId" serial NOT NULL,
	"username" TEXT NOT NULL UNIQUE,
	"email" TEXT NOT NULL UNIQUE,
	"password" TEXT NOT NULL,
	"createdAt" time with time zone NOT NULL,
	CONSTRAINT "Users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.Posts" (
	"createdAt" time with time zone NOT NULL,
	"postId" serial NOT NULL,
	"userId" int NOT NULL,
	"description" TEXT NOT NULL,
	"title" TEXT NOT NULL,
	"imgUrl" TEXT NOT NULL,
	CONSTRAINT "Posts_pk" PRIMARY KEY ("postId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.messages" (
	"message" TEXT NOT NULL,
	"userId" int NOT NULL,
	"postId" int NOT NULL
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.Saved" (
	"postId" int NOT NULL,
	"userId" int NOT NULL
) WITH (
  OIDS=FALSE
);




ALTER TABLE "Posts" ADD CONSTRAINT "Posts_fk0" FOREIGN KEY ("userId") REFERENCES "Users"("userId");

ALTER TABLE "messages" ADD CONSTRAINT "messages_fk0" FOREIGN KEY ("userId") REFERENCES "Users"("userId");
ALTER TABLE "messages" ADD CONSTRAINT "messages_fk1" FOREIGN KEY ("postId") REFERENCES "Posts"("postId");

ALTER TABLE "Saved" ADD CONSTRAINT "Saved_fk0" FOREIGN KEY ("postId") REFERENCES "Posts"("postId");
ALTER TABLE "Saved" ADD CONSTRAINT "Saved_fk1" FOREIGN KEY ("userId") REFERENCES "Users"("userId");
