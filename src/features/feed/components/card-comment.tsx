import { useAuth } from "@clerk/clerk-expo";
import { IMAGE } from "@constants/image.constant";
import { useChatListByUnique, useCreateChat } from "@hooks/useChat";
import { usePostById } from "@hooks/usePost";
import { Comment } from "@models/comment.type";
import { transformDate } from "@utils/helpers";
import axios from "axios";
import { Redirect, router } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { Avatar, Card, IconButton } from "react-native-paper";
import { theme } from "src/theme";

export default function CardComment({
  comment,
}: {
  comment: Comment;
}): JSX.Element {
  const { userId, isSignedIn } = useAuth();
  if (!userId || !isSignedIn) return <Redirect href="/(auth)/sign-in" />;
  const { data: post } = usePostById({ id: comment.postId });
  if (!post) return <Redirect href="/(home)/feed" />;
  const imageComment = `${IMAGE.CLOUDINARY_URL}${IMAGE.USER_GENERIC}`;
  const timestamp = `?timestamp=${Date.now()}`;
  const urlImage = `${IMAGE.CLOUDINARY_URL}${IMAGE.USER_FOLDER}/${comment.userId}.jpg${timestamp}`;
  const [imageCommentUser, setImageCommentUser] =
    useState<string>(imageComment);
  const { data: chatByUnique } = useChatListByUnique({
    unique: {
      postId: post.id,
      userCommentId: comment.userId,
      userPostId: post.userId,
    },
  });
  const { mutateAsync: createChat } = useCreateChat();

  useEffect(() => {
    (async () => {
      try {
        const test = await axios.get(urlImage);
        if (test.status === 200) setImageCommentUser(urlImage);
        return;
      } catch (e) {
        return;
      }
    })();
  }, []);

  const handleChat = async () => {
    if (chatByUnique) {
      router.push(`/feed/${comment.postId}/${chatByUnique.id}`);
    } else {
      console.log("createChat");
      const newChat = await createChat({
        postId: post.id,
        userCommentId: comment.userId,
        userPostId: post.userId,
      });
      Alert.alert(
        "Nuevo chat",
        `Se ha iniciado un nuevo chat privado entre @${post.username} y @${comment.username}. Ten precaución al compartir información personal.`
      );

      router.push(`/feed/${comment.postId}/${newChat.id}`);
    }
  };

  return (
    <Card
      style={{ marginVertical: 20, opacity: post.isArchived ? 0.5 : 1 }}
      disabled={post.isArchived}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 10,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
          <Avatar.Image
            size={64}
            style={{ marginRight: 10 }}
            source={{
              uri: imageCommentUser,
            }}
          />
          <View>
            <Text style={styles.username}>@{comment.username}</Text>
            <Text style={styles.date}>{transformDate(comment.timestamp)}</Text>
          </View>
        </View>
        {((userId === post.userId && userId !== comment.userId) ||
          (userId === comment.userId && userId !== post.userId)) && (
          <IconButton
            icon="chat"
            size={30}
            onPress={handleChat}
            iconColor={
              post.isArchived
                ? theme.colors.backdrop
                : theme.colors.secondaryContainer
            }
            containerColor={
              post.isArchived ? theme.colors.backdrop : theme.colors.secondary
            }
            disabled={post.isArchived}
          />
        )}
      </View>
      <Card.Content>
        <Text style={styles.message}>{comment.message}</Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  message: {
    marginBottom: 16,
    fontSize: 16,
  },
  username: {
    fontSize: 18,
    fontWeight: "600",
    color: theme.colors.backdrop,
  },
  date: {
    fontSize: 14,
    fontWeight: "400",
    color: theme.colors.backdrop,
  },
});
