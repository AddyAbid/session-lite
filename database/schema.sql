set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "public"."users" (
	"userId" serial,
	"username" TEXT NOT NULL UNIQUE,
	"email" TEXT NOT NULL UNIQUE,
	"password" TEXT NOT NULL,
	"createdAt" time with time zone NOT NULL default now(),
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."posts" (
	"createdAt" timestamptz(6) not null default now(),
	"postId" serial,
	"userId" int,
	"description" TEXT NOT NULL,
	"title" TEXT NOT NULL,
  "price" TEXT NOT NULL,
	"imgUrl" TEXT NOT NULL,
	CONSTRAINT "posts_pk" PRIMARY KEY ("postId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."messages" (
	"message" TEXT NOT NULL,
	"senderId" int NOT NULL,
	"postId" int NOT NULL,
  "recipientId" int NOT NULL,
  "createdAt" timestamptz(6) not null default now()
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."saved" (
	"postId" int NOT NULL,
	"userId" int NOT NULL
) WITH (
  OIDS=FALSE
);




ALTER TABLE "posts" ADD CONSTRAINT "posts_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");

ALTER TABLE "messages" ADD CONSTRAINT "messages_fk0" FOREIGN KEY ("senderId") REFERENCES "users"("userId");
ALTER TABLE "messages" ADD CONSTRAINT "messages_fk1" FOREIGN KEY ("postId") REFERENCES "posts"("postId");
ALTER TABLE "messages" ADD CONSTRAINT "messages_fk2" FOREIGN KEY ("recipientId") REFERENCES "users"("userId");

ALTER TABLE "saved" ADD CONSTRAINT "saved_fk0" FOREIGN KEY ("postId") REFERENCES "posts"("postId");
ALTER TABLE "saved" ADD CONSTRAINT "saved_fk1" FOREIGN KEY ("userId") REFERENCES "users"("userId");
