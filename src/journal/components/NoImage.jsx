import { ImageListItem, Stack } from '@mui/material'
import React from 'react'

export const NoImage = () => {
  return (
    <Stack
        sx={{
            mt: 1
        }}
        alignItems='center'
    >        
        <ImageListItem
            sx={{
                width: '60%',
                height: 300,
            }}
        >
            <img 
                src="./noimage.svg" 
                alt="no image uploaded" 
            />
        </ImageListItem>

    </Stack>
  )
}
