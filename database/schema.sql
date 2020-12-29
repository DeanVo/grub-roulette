set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";
CREATE TABLE "restaurants" (
	"restaurantId" serial NOT NULL,
	"userId" serial NOT NULL,
	"addressId" serial NOT NULL,
	"categoryId" serial NOT NULL,
	"reviewId" serial NOT NULL,
	"restaurantName" TEXT NOT NULL,
	CONSTRAINT "restaurants_pk" PRIMARY KEY ("restaurantId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "users" (
	"userId" serial NOT NULL,
	"userName" TEXT NOT NULL,
	"latitude" float4 NOT NULL,
	"longitude" float4 NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
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



CREATE TABLE "userFavorites" (
	"userId" integer NOT NULL,
	"restaurantId" integer NOT NULL,
	"isFavorited" BOOLEAN NOT NULL,
	"notes" TEXT NOT NULL
) WITH (
  OIDS=FALSE
);



CREATE TABLE "userBookmarks" (
	"userId" integer NOT NULL,
	"restaurantId" integer NOT NULL,
	"isBookmarked" BOOLEAN NOT NULL
) WITH (
  OIDS=FALSE
);



CREATE TABLE "restaurantReviews" (
	"reviewId" serial NOT NULL,
	"restaurantId" integer NOT NULL,
	"reviewerName" serial NOT NULL,
	"totalYelpReviews" serial NOT NULL,
	"reviewDate" serial NOT NULL,
	"review" serial NOT NULL,
	CONSTRAINT "restaurantReviews_pk" PRIMARY KEY ("reviewId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "hours" (
	"restaurantId" integer NOT NULL,
	"monday" TIMESTAMP NOT NULL,
	"tuesday" TIMESTAMP NOT NULL,
	"wednesday" TIMESTAMP NOT NULL,
	"thursday" TIMESTAMP NOT NULL,
	"friday" TIMESTAMP NOT NULL,
	"saturday" TIMESTAMP NOT NULL,
	"sunday" TIMESTAMP NOT NULL,
	CONSTRAINT "hours_pk" PRIMARY KEY ("restaurantId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "randomRestaurant" (
	"restaurantId" serial NOT NULL,
	"name" TEXT NOT NULL,
	"image" TEXT NOT NULL,
	CONSTRAINT "randomRestaurant_pk" PRIMARY KEY ("restaurantId")
) WITH (
  OIDS=FALSE
);



ALTER TABLE "restaurants" ADD CONSTRAINT "restaurants_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "restaurants" ADD CONSTRAINT "restaurants_fk1" FOREIGN KEY ("addressId") REFERENCES "address"("addressId");
ALTER TABLE "restaurants" ADD CONSTRAINT "restaurants_fk2" FOREIGN KEY ("categoryId") REFERENCES "categories"("categoryId");
ALTER TABLE "restaurants" ADD CONSTRAINT "restaurants_fk3" FOREIGN KEY ("reviewId") REFERENCES "restaurantReviews"("reviewId");




ALTER TABLE "userFavorites" ADD CONSTRAINT "userFavorites_fk0" FOREIGN KEY ("restaurantId") REFERENCES "restaurants"("restaurantId");

ALTER TABLE "userBookmarks" ADD CONSTRAINT "userBookmarks_fk0" FOREIGN KEY ("restaurantId") REFERENCES "restaurants"("restaurantId");


ALTER TABLE "hours" ADD CONSTRAINT "hours_fk0" FOREIGN KEY ("restaurantId") REFERENCES "restaurants"("restaurantId");
