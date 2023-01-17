import React from 'react';
import {Text, styled} from 'dripsy';
import TouchableOpacityBox from './TouchableOpacityBox';

const ButtonContainer = styled(TouchableOpacityBox)({
  bg: '$primary',
  height: 50,
  justifyContent: 'center',
  borderRadius: 10,
});

const Button = ({
  children,
  ...rest
}: React.ComponentProps<typeof ButtonContainer>) => (
  <ButtonContainer {...rest}>
    <Text
      sx={{
        color: 'white',
        textAlign: 'center',
        fontSize: '$2',
        fontWeight: '800',
      }}>
      {children}
    </Text>
  </ButtonContainer>
);

export default Button;
