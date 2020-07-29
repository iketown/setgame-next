import React from "react";
import { Container, Grid } from "@material-ui/core";
import Avatar from "avataaars";
import Layout from "@components/layout/Layout";
import { AvatarForm } from "./AvatarForm";
import AvatarSelector from "./AvatarSelector";

const AvatarsPage: React.FC = () => {
  return (
    <Layout>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Avatar
              style={{ width: "3rem", height: "3rem" }}
              avatarStyle="Circle"
              topType="LongHairMiaWallace"
              accessoriesType="Prescription02"
              hairColor="BrownDark"
              facialHairType="Blank"
              clotheType="Hoodie"
              clotheColor="PastelBlue"
              eyeType="Happy"
              eyebrowType="Default"
              mouthType="Smile"
              skinColor="Light"
            />
          </Grid>
          <Grid item xs={12}>
            <AvatarSelector />
          </Grid>
          <Grid item xs={12}>
            <AvatarForm />
          </Grid>
          <Grid item xs={12} sm={6} />
          <Grid item xs={12} sm={6} />
        </Grid>
      </Container>
    </Layout>
  );
};

export default AvatarsPage;
