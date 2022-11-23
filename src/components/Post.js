import React, { useContext, useEffect, useState } from "react";
import AddComment from './Add-Comment-Form'
import AddPost from './Add-post-form'
import EditPost from './Edit-post-modal'
import { authContext } from "./Context/AuthContext";
import { FaFacebook, FaTwitter } from 'react-icons/fa';
import {
  Card, CardHeader, CardBody, CardFooter, Box,
  Flex,
  Image,
  Text,
  Button,
  Avatar,
  Heading,
  

} from '@chakra-ui/react'
import logo from '../photo/OmarQattam.jpeg'
import Like from './feature/like';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMessage, faShare, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { increment, decrement, selectCount } from './feature/likeSlicer';
import { useDispatch, useSelector } from 'react-redux';
import { configureStore } from "@reduxjs/toolkit";
export default function Post() {
  const { getAllPost, showPostComponent, posts, deletePost, deleteComment, editPost, checkToken, user } = useContext(authContext)
  useEffect(() => {
    checkToken()
    getAllPost()


  }, [])

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const counter = useSelector(selectCount)
    const dispatch = useDispatch();

  return (
    <div>
      <AddPost getAllPost={getAllPost} />
      {posts && user.loggedin &&
        posts.map((posts, idx) => {
          return (

            <div key={idx}>
              <Card maxW='md'>
                <CardHeader>
                  <Flex spacing='4'>
                    <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                      <Avatar name='Segun Adebayo' src={logo} alt="Logo" />

                      <Box>
                        <Heading size='sm'>{posts.userName}</Heading>
                        <Text>Segun Adebayo</Text>
                      </Box>
                    </Flex>

                    <EditPost editPost={() => editPost(posts.id)} postsID={posts.id} getAllPost={getAllPost} />
                    {
                      user.roles === 'admin' &&
                      <Button variant="primary" onClick={() => deletePost(posts.id)}>Delete Post</Button>
                    }
                  </Flex>
                </CardHeader>
                <CardBody>
                  <Text>
                    {posts.post}
                  </Text>
                </CardBody>
                <Image
                  objectFit='cover'
                  src='https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                  alt='Chakra UI'
                />


                <Box >


                  <AddComment PostId={posts.id} gitpost={getAllPost} />
                  {showPostComponent &&
                    posts.userComments.map((comment, idx) => {
                      return (
                        <div key={idx} spacing='4'>


                          <Flex spacing='4'>
                            <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                              <Avatar name='Segun Adebayo' src={logo} alt="Logo" />

                              <Box>
                                <Heading size='sm'>{comment.userName}</Heading>
                                {comment.comment}
                              </Box>
                            </Flex>

                          </Flex>
                          <CardBody>

                            <Button >Edit Comment</Button>
                            <Button onClick={() => deleteComment(comment.id)}>Delete Comment</Button>
                          </CardBody>
                        </div>
                      );
                    })}

                </Box>



                <CardFooter
                  justify='space-between'
                  flexWrap='wrap'
                  sx={{
                    '& > button': {
                      minW: '136px',
                    },
                  }}
                >

                  <Button flex='1' variant='ghost' >
                  <Like />
                  </Button>
               
                  <Button onClick={handleShow} flex='1' variant='ghost' leftIcon={<FontAwesomeIcon icon={faMessage} />}>
                    Comment
                  </Button>
                  <Button flex='1' variant='ghost' leftIcon={<FontAwesomeIcon icon={faShare} />}>
                    Share
                  </Button>
                 
                </CardFooter>
              </Card>

            </div>
          );
        })}
      <Button colorScheme='facebook' leftIcon={<FaFacebook />}>
        Facebook
      </Button>
      <Button colorScheme='twitter' leftIcon={<FaTwitter />}>
        Twitter
      </Button>
    </div>
  );
}
