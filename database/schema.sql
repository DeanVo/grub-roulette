set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "restaurants" (
	"businessId" serial NOT NULL,
	"restaurantName" TEXT NOT NULL,
	"addressId" TEXT NOT NULL,
	"categoryId" int NOT NULL,
	"ratingId" int NOT NULL,
	"hoursId" serial NOT NULL,
	CONSTRAINT "restaurants_pk" PRIMARY KEY ("businessId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "categories" (
	"categoryId" serial NOT NULL,
	"categoryName" serial NOT NULL,
	CONSTRAINT "categories_pk" PRIMARY KEY ("categoryId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "address" (
	"addressId" serial NOT NULL,
	"line1" TEXT NOT NULL,
	"line2" TEXT NOT NULL,
	"line3" TEXT NOT NULL,
	"state" TEXT NOT NULL,
	"country" TEXT NOT NULL,
	"zip" TEXT NOT NULL,
	"latitude" float4 NOT NULL,
	"longitude" float4 NOT NULL,
	CONSTRAINT "address_pk" PRIMARY KEY ("addressId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "hours" (
	"hoursId" integer NOT NULL,
	"monday" TIMESTAMP NOT NULL,
	"tuesday" TIMESTAMP NOT NULL,
	"wednesday" TIMESTAMP NOT NULL,
	"thursday" TIMESTAMP NOT NULL,
	"friday" TIMESTAMP NOT NULL,
	"saturday" TIMESTAMP NOT NULL,
	"sunday" TIMESTAMP NOT NULL,
	CONSTRAINT "hours_pk" PRIMARY KEY ("hoursId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "randomHistory" (
	"businessId" TEXT NOT NULL UNIQUE,
	"userId" int NOT NULL,
	"restaurantName" TEXT NOT NULL,
	"imageUrl" TEXT NOT NULL,
	"rating" numeric NOT NULL,
	"totalReviews" int NOT NULL,
	"address" TEXT NOT NULL,
	"categories" TEXT NOT NULL,
	CONSTRAINT "randomHistory_pk" PRIMARY KEY ("businessId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "rating" (
	"ratingId" serial NOT NULL,
	"rating" numeric NOT NULL,
	CONSTRAINT "rating_pk" PRIMARY KEY ("ratingId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "users" (
	"userId" serial NOT NULL,
	"username" TEXT NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



ALTER TABLE "restaurants" ADD CONSTRAINT "restaurants_fk0" FOREIGN KEY ("categoryId") REFERENCES "categories"("categoryId");
ALTER TABLE "restaurants" ADD CONSTRAINT "restaurants_fk1" FOREIGN KEY ("ratingId") REFERENCES "rating"("ratingId");




ALTER TABLE "randomHistory" ADD CONSTRAINT "randomHistory_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
