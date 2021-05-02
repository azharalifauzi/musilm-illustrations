import { Button } from '@chakra-ui/button';
import { Box, Flex, Grid, Text } from '@chakra-ui/layout';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay } from '@chakra-ui/modal';
import { IcArrow } from 'assets/icons';
import React, { useState } from 'react';
import ColorPicker from '../color-picker';
import { Popover, PopoverBody, PopoverContent, PopoverTrigger } from '@chakra-ui/popover';
import {
  FacebookShareButton,
  TwitterShareButton,
  PinterestShareButton,
  TwitterIcon,
  FacebookIcon,
  PinterestIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from 'react-share';

interface IllustrationDetailProps {
  title?: string;
  author?: string;
  onClose?: () => void;
  isOpen?: boolean;
  slug?: string;
  id?: string;
}

const IllustrationDetail: React.FC<IllustrationDetailProps> = ({
  isOpen,
  onClose,
  children,
  title,
  author,
}) => {
  const [color, setColor] = useState<string>('#26B6BD');
  const [openPicker, setOpen] = useState<boolean>(false);

  return (
    <Modal size="5xl" isOpen={isOpen} isCentered onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton data-testid="close-button" />
        <ModalBody px="6" py="16">
          <Grid templateColumns="repeat(2, 1fr)">
            <Box color={color}>{children}</Box>
            <Box>
              <Text as="h2" fontFamily="heading" fontSize="24" color="brand.cyan" fontWeight="bold">
                {title}
              </Text>
              <Text fontSize="12" mb="7">
                Illustration by {author}
              </Text>
              <Flex mb="12" alignItems="center">
                <Flex mr="2" alignItems="center">
                  <Text mr="2" color="brand.cyanDark">
                    Find your favourite color
                  </Text>
                  <IcArrow />
                </Flex>
                <Popover placement="right" onClose={() => setOpen(false)} isOpen={openPicker}>
                  <PopoverTrigger>
                    <Box
                      as="button"
                      h="25px"
                      w="25px"
                      bg={color}
                      border="1px solid"
                      borderColor="brand.cyanDark"
                      borderRadius="md"
                      onClick={() => {
                        setOpen((state) => !state);
                      }}
                    ></Box>
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverBody>
                      <ColorPicker color={color} onChange={({ hex }) => setColor(hex)} />
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              </Flex>
              <Box mb="6">
                <Text mb="1">Share :</Text>
                <Grid templateColumns="repeat(4, max-content)" gap="10px">
                  <TwitterShareButton url="https://muslimillustrations.co/illustrations?open-detail=asdf">
                    <TwitterIcon round size={32} />
                  </TwitterShareButton>
                  <FacebookShareButton url="https://muslimillustrations.co/illustrations?open-detail=asdf">
                    <FacebookIcon round size={32} />
                  </FacebookShareButton>
                  <PinterestShareButton
                    media="/file"
                    url="https://muslimillustrations.co/illustrations?open-detail=asdf"
                  >
                    <PinterestIcon round size={32} />
                  </PinterestShareButton>
                  <WhatsappShareButton url="https://muslimillustrations.co/illustrations?open-detail=asdf">
                    <WhatsappIcon round size={32} />
                  </WhatsappShareButton>
                </Grid>
              </Box>
              <Button w="100%" mb="4" colormode="cyan">
                Download SVG for your project
              </Button>
              <Button w="100%" colormode="green">
                Download PNG for simple document
              </Button>
            </Box>
          </Grid>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default IllustrationDetail;
