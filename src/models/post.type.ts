import { z } from "zod";
import { ImageSchema } from "./image.type";
import { PostCommitmentSchema } from "./postCommitment.type";
import { ChatSchema } from "./chat.type";
import { MaterialProductSchema } from "./materialProduct.type";
import { UserSchema } from "./user.type";

export const PostSchema = z.object({
  id: z.string(),
  postNumber: z.number(),
  quantity: z.number(),
  description: z.string(),
  purpouse: z.string(),
  pointsAwared: z.number(),
  userId: z.string(),
  materialProductId: z.string(),
  isActive: z.boolean(),
  isReserved: z.boolean(),
  isArchived: z.boolean(),
  Chat: z.array(ChatSchema),
  materialProduct: MaterialProductSchema.pick({ id: true }),
  userPost: UserSchema.pick({ id: true }),
  PostCommitment: z.array(PostCommitmentSchema),
  Image: ImageSchema.optional(),
});

const PostPostSchema = z.object({
  postNumber: z.number(),
  quantity: z.number(),
  description: z.string(),
  purpouse: z.string(),
  pointsAwared: z.number(),
  userId: z.string(),
  materialProductId: z.string(),
  isActive: z.boolean(),
  isReserved: z.boolean(),
  isArchived: z.boolean(),
  Chat: z.array(ChatSchema),
  materialProduct: MaterialProductSchema.pick({ id: true }),
  userPost: UserSchema.pick({ id: true }),
  PostCommitment: z.array(PostCommitmentSchema),
  Image: ImageSchema.optional(),
});

const PostPutSchema = z.object({
  id: z.string(),
  postNumber: z.number().optional(),
  quantity: z.number().optional(),
  description: z.string().optional(),
  purpouse: z.string().optional(),
  pointsAwared: z.number().optional(),
  userId: z.string().optional(),
  materialProductId: z.string().optional(),
  isActive: z.boolean().optional(),
  Chat: z.array(ChatSchema).optional(),
  materialProduct: MaterialProductSchema.pick({ id: true }).optional(),
  userPost: UserSchema.pick({ id: true }).optional(),
  PostCommitment: z.array(PostCommitmentSchema).optional(),
  Image: ImageSchema.optional(),
});

export type Post = z.infer<typeof PostSchema>;
export type PostPost = z.infer<typeof PostPostSchema>;
export type PostPut = z.infer<typeof PostPutSchema>;

// model Post {
//   id                String           @id @default(cuid())
//   postNumber        Int              @unique @db.SmallInt
//   quantity          Int              @db.SmallInt
//   description       String           @db.VarChar(255)
//   purpouse          PostPurpouse
//   pointsAwared      Int
//   userId            String
//   materialProductId String
//   isActive          Boolean          @default(true)
//   isReserved        Boolean          @default(false)
//   isArchived        Boolean          @default(false)
//   Chat              Chat[]
//   materialProduct   MaterialProduct  @relation(fields: [materialProductId], references: [id])
//   userPost          User             @relation(fields: [userId], references: [id])
//   PostCommitment    PostCommitment[]
//   Image             Image?
// }