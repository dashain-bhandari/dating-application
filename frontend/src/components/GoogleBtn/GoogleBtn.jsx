import { Button, createStyles, em, px, rem } from '@mantine/core';
import React from 'react';
import googleIcon from '../../images/google icon.png';
import { BrandGoogle } from 'tabler-icons-react';

const useStyles = createStyles((theme) => ({
    button: {
        color: 'black',
        border: `${em(2)} solid rgba(0,0,0,0.7)`,
        outline: 'none',
    }
}))

function GoogleBtn() {

    const { classes } = useStyles();

  return (
   
    <Button  className={classes.button}
    leftIcon={<BrandGoogle size={rem(18)} strokeWidth={3} color='#000000' />}
    fullWidth size='md' mb="md" variant='outline' >Continue with Google</Button>
  )
}

export default GoogleBtn