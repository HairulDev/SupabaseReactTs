import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CommentIcon from '@mui/icons-material/Comment';

import image404 from '../../../assets/img/image404.png';

import moment from 'moment';
import { Badge, Button } from '@mui/material';
import { useAuthStore } from '../../../pages/auth/storeAuth';
import { useNavigate } from 'react-router-dom';


export default function GameItem(props: any) {
    const { id, title, likes, comments, creator, createdAt, setCurrentId }: any = props;

    const userJson = localStorage.getItem('profile');
    const tokenProfile = userJson ? JSON.parse(userJson) : null;

    const { deleteGame, getGames, games, likeGame } = useAuthStore();
    const [disableSubmit, setDisableSubmit] = useState(false);
    const navigate = useNavigate();

    const handleDelete = async (id: any) => {
        setDisableSubmit(true);
        await deleteGame(id);
        await clear();
    };

    const clear = async () => {
        await getGames();
        setDisableSubmit(false);
    };

    const handleFav = async (id: any) => {
        await likeGame(id)
        await getGames();
    };
    const Favorite = () => {
        if (likes) {
            return likes?.find((like: any) => like === tokenProfile?.user.id)
                ? (
                    <Badge badgeContent={likes?.length} color="warning">
                        <FavoriteIcon color='error' />
                    </Badge>
                ) : (
                    <Badge badgeContent={likes?.length} color="warning">
                        <FavoriteBorderIcon color='error' />
                    </Badge>
                )
        }
        return <FavoriteBorderIcon />

    }

    const handleComment = async (id: any) => {
        navigate(`/game/${id}`)
    };
    const Comment = () => {
        if (comments) {
            return comments?.find((comment: any) => comment.id === tokenProfile?.user.id)
                ? (
                    <Badge badgeContent={comments?.length} color="primary">
                        <CommentIcon />
                    </Badge>
                ) : (
                    <Badge badgeContent={comments?.length} color="primary">
                        <CommentIcon color='primary' />
                    </Badge>
                )
        }
        return <CommentIcon />

    }


    return (
        <Card sx={{ width: 250, m: 1 }} >
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {title[0]}
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        {(tokenProfile?.user.id === creator) && (
                            <MoreVertIcon onClick={(e) => {
                                e.stopPropagation();
                                setCurrentId(id);
                            }} />
                        )}
                    </IconButton>
                }
                title={title}
                subheader={moment(createdAt).fromNow()}
            />
            <CardMedia
                component="img"
                height="194"
                image={image404}
                alt="Paella dish"
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    Ini deskripsi game
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites"
                    onClick={() => {
                        handleFav(id)
                    }}
                >
                    <Favorite />
                </IconButton>
                <IconButton aria-label="comment"
                    onClick={() => {
                        handleComment(id)
                    }}>
                    <Comment />
                </IconButton>
                <IconButton aria-label="comment">
                    {(tokenProfile?.user.id === creator) && (
                        <Button
                            disabled={disableSubmit}
                            onClick={() => {
                                handleDelete(id)
                            }}
                        >Delete</Button>
                    )}

                </IconButton>
            </CardActions>
        </Card>
    );
}