set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "public"."users" (
	"userId" serial NOT NULL,
	"username" TEXT NOT NULL UNIQUE,
	"email" TEXT NOT NULL UNIQUE,
	"password" TEXT NOT NULL,
	"createdAt" time with time zone NOT NULL default now(),
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."posts" (
	"createdAt" time with time zone NOT NULL,
	"postId" serial NOT NULL,
	"userId" int NOT NULL,
	"description" TEXT NOT NULL,
	"title" TEXT NOT NULL,
	"imgUrl" TEXT NOT NULL,
	CONSTRAINT "posts_pk" PRIMARY KEY ("postId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."messages" (
	"message" TEXT NOT NULL,
	"userId" int NOT NULL,
	"postId" int NOT NULL
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

ALTER TABLE "messages" ADD CONSTRAINT "messages_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "messages" ADD CONSTRAINT "messages_fk1" FOREIGN KEY ("postId") REFERENCES "posts"("postId");

ALTER TABLE "saved" ADD CONSTRAINT "saved_fk0" FOREIGN KEY ("postId") REFERENCES "posts"("postId");
ALTER TABLE "saved" ADD CONSTRAINT "saved_fk1" FOREIGN KEY ("userId") REFERENCES "users"("userId");
