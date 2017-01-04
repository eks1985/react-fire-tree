export default 
  {
    content: {
      display: "flex",
      flexDirection: "column"
    },
    childrenSublings: {
      container: {
        display: "flex"
      },
      connectorsContainer: {
        position: "relative"
      },
      connectors: {
        position: "absolute",
        top: "0px",
        bottom: "0px",
        background: "darkorchid"
      }
    },
    connectors: {
      container: {
        display: "flex",
        position: "relative",
      },
      handle: {
        display: "flex",
        position: "absolute",
        top: "0px",
        right: "0px",
        border: "1px solid #aaa",
        borderRight: "none",
        boxShadow: "0 2px 2px -2px",
      },
      expandButton: {
        position: "absolute",
        borderRadius: "100%",
        outline: "none",
        cursor: "pointer",
        fontSize: "14px",
        fontFamily: "monospace",
        background: "white",
        zIndex: 999
      },
      parentTop: {
        position: "absolute",
        top: "0px",
        background: "red",
      },
      parentLeft: {
        position: "absolute",
        background: "green",
      },
      sublings: {
        position: "absolute",
        bottom: "0px",
        background: "goldenrod",
      },
      children: {
        position: "absolute",
        bottom: "0px",
        background: "blue",
      }
    },
    button: {
      container: {
        display: "flex",
        width: "600px",
      },
      body: {
        display: "flex",
        flex: 1,
        position: "relative",
        flexDirection: "column",
      },
      inner: {
        width: "100%",
        border: "1px solid #aaa",
        boxShadow: "2px 2px 2px -2px",
        fontFamily: "Roboto",
        fontSize: "16px",
        overflow: "hidden",
        padding: "5px"
      },
      titleStyle: {
        height: "100%", 
        overflow: "hidden"
      }
    },
    childrenWwapper: {
      display: "flex", 
      flexDirection: "column"
    }
  };