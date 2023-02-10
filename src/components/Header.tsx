import React from 'react';
import { StatusBar, Box, HStack, Text, IconButton, Icon } from "native-base";
import {MaterialIcons} from '@expo/vector-icons';
import colors from '../config/colors';

interface HeaderProps {
    chain: string;
}
export default function Header(props: HeaderProps) {
  return (
    <>
    <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <Box safeAreaTop bg={colors.primary} />
      <HStack bg={colors.primary} px="1" py="3" justifyContent="space-between" alignItems="center" w="100%" maxW="400">
        <HStack alignItems="center">
          <IconButton icon={<Icon size="sm" as={MaterialIcons} name="menu" color="white" />} />
          <Text color="white" fontSize="20" fontWeight="bold">
            {props.chain}
          </Text>
        </HStack>
        <HStack>
          <IconButton icon={<Icon as={MaterialIcons} name="more-vert" size="sm" color="white" />} />
        </HStack>
      </HStack>
      </>
  );
}
