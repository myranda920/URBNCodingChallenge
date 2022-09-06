import * as React from "react";
import Input from "@cloudscape-design/components/input";
import "./SearchBar.scss";

const SearchBar = (props: any) => {
  const [value, setValue] = React.useState("");

  const getData = () => {
    const query = value.replace(/\s/g, '');
    fetch(`https://www.reddit.com/r/${query}.json`)
    .then(response => response.json())
    .then(body => {
      props.setData(body.data?.children)
    })
    .catch(error => {
      return error;
    });
  }
  
  const onEnter	= ({ detail }) => {
    if (detail.key === 'Enter') getData();
  }

  return (
    <Input
      onChange={({ detail }) => setValue(detail.value)}
      value={value}
      placeholder="Search Urban Outfitters"
      onKeyDown={onEnter}
      className="SearchBar"
    />
  );
}

export default SearchBar;