import * as React from "react";
import Header from "@cloudscape-design/components/header";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";

const MyHeader = (props) => {
  return (
    <Header
      headingTagOverride="h1"
      variant="h1"
      actions={
        <SpaceBetween direction="horizontal" size="xs">
          <Button>Log In</Button>
          <Button variant="primary">
            Sign Up
          </Button>
        </SpaceBetween>
      }
    >
      Reddit
    </Header>
  );
}

export default MyHeader;