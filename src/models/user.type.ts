import * as z from "zod";
import { AddressSchema } from "./address.type";
import { AdvertisementSchema } from "./advertisement.type";
import { ChatMessageSchema } from "./chatMessage.type";
import { PostSchema } from "./post.type";
import { RatingSchema } from "./rating.type";
import { UserStoreSchema } from "./userStore.type";
import { UserCustomerSchema } from "./userCustomer.type";
import { ImageSchema } from "./image.type";

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  surname: z.string(),
  mail: z.string(),
  phone: z.string(),
  password: z.string(),
  username: z.string(),
  isArchived: z.boolean(),
  createDate: z.coerce.date(),
  userType: z.string(),
  address: z.array(AddressSchema),
  Advertisement: z.array(AdvertisementSchema),
  ChatMessageReceived: z.array(ChatMessageSchema),
  ChatMessageSent: z.array(ChatMessageSchema),
  Post: z.array(PostSchema),
  Rating: RatingSchema.optional(),
  UserStore: UserStoreSchema.optional(),
  UserCustomer: UserCustomerSchema.optional(),
  Image: ImageSchema.optional(),
});

const UserPostSchema = z.object({
  name: z.string(),
  surname: z.string(),
  mail: z.string(),
  phone: z.string(),
  password: z.string(),
  username: z.string(),
  isArchived: z.boolean(),
  createDate: z.coerce.date(),
  userType: z.string(),
  address: z.array(AddressSchema),
  Advertisement: z.array(AdvertisementSchema),
  ChatMessageReceived: z.array(ChatMessageSchema),
  ChatMessageSent: z.array(ChatMessageSchema),
  Post: z.array(PostSchema),
  Rating: RatingSchema.optional(),
  UserStore: UserStoreSchema.optional(),
  UserCustomer: UserCustomerSchema.optional(),
  Image: ImageSchema.optional(),
});

const UserPutSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  surname: z.string().optional(),
  mail: z.string().optional(),
  phone: z.string().optional(),
  password: z.string().optional(),
  username: z.string().optional(),
  isArchived: z.boolean().optional(),
  createDate: z.coerce.date().optional(),
  userType: z.string().optional(),
  address: z.array(AddressSchema).optional(),
  Advertisement: z.array(AdvertisementSchema).optional(),
  ChatMessageReceived: z.array(ChatMessageSchema).optional(),
  ChatMessageSent: z.array(ChatMessageSchema).optional(),
  Post: z.array(PostSchema).optional(),
  Rating: RatingSchema.optional(),
  UserStore: UserStoreSchema.optional(),
  UserCustomer: UserCustomerSchema.optional(),
  Image: ImageSchema.optional(),
});

export type User = z.infer<typeof UserSchema>;
export type UserPost = z.infer<typeof UserPostSchema>;
export type UserPut = z.infer<typeof UserPutSchema>;

// model User {
//   id                  String          @id @default(cuid())
//   name                String          @db.VarChar(30)
//   surname             String          @db.VarChar(30)
//   mail                String          @unique @db.Citext
//   phone               String          @db.VarChar(13)
//   password            String          @db.VarChar(16)
//   username            String          @unique @db.Citext
//   isArchived          Boolean         @default(false)
//   createDate          DateTime        @default(now()) //allow first two days to add benefits to get benefit-discount or wait for USBOFFmensual. Only valid the first time.
//   userType            UserType
//   address             Address[]
//   Advertisement       Advertisement[]
//   ChatMessageReceived ChatMessage[]   @relation("chatReceiver")
//   ChatMessageSent     ChatMessage[]   @relation("chatSender")
//   Post                Post[]
//   Rating              Rating?
//   UserStore           UserStore?
//   UserCustomer        UserCustomer?
//   Image               Image?
// }