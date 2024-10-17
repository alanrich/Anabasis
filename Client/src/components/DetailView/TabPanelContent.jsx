import React from "react";
import PropTypes from "prop-types";
import { Typography, Grid, Divider } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { shouldForwardProp } from "@mui/system";

const FieldTitle = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "isModal" && shouldForwardProp(prop),
})(({ theme, isModal }) => ({
  display: "inline-block",
  backgroundColor: theme.palette.grey[400],
  color: "white",
  padding: "6px 12px",
  borderRadius: theme.shape.borderRadiusLarge,
  marginBottom: theme.spacing(1),
  fontWeight: "bold",
  fontSize: isModal ? "1rem" : theme.typography.subtitle1.fontSize,
}));

const Field = ({ title, value, type, isModal, fontSize }) => {
  const isHistoire = title.toLowerCase() === "histoire";
  const theme = useTheme();

  const titleVariant = isModal ? "h6" : "subtitle1";
  const valueFontSize =
    fontSize || (isModal ? (isHistoire ? ".8rem" : "1rem") : ".8rem");

  if (!value) {
    value = "Non disponible";
  }

  // Handle 'wikiLink' type
  if (type === "wikiLink" && value && value !== "Non disponible") {
    const artistNames = Array.isArray(value)
      ? value
      : value.split(",").map((name) => name.trim());

    return (
      <Grid item xs={12} sm={6}>
        <FieldTitle variant={titleVariant} isModal={isModal}>
          {title}:
        </FieldTitle>
        <Divider sx={{ marginBottom: theme.spacing(1) }} />
        {artistNames.map((artistName, index) => (
          <Typography
            key={index}
            variant="body2"
            sx={{
              marginLeft: theme.spacing(1),
              fontSize: valueFontSize,
              marginTop: isModal ? theme.spacing(0.5) : "0px",
            }}
          >
            <a
              href={`https://fr.wikipedia.org/wiki/${encodeURIComponent(
                artistName.trim()
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: theme.palette.primary.main,
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              {artistName}
            </a>
          </Typography>
        ))}
      </Grid>
    );
  }

  if (Array.isArray(value)) {
    if (type === "link") {
      return (
        <Grid item xs={12} sm={6}>
          <FieldTitle variant={titleVariant} isModal={isModal}>
            {title}:
          </FieldTitle>
          <Divider sx={{ marginBottom: theme.spacing(1) }} />
          {value.map((link, index) => (
            <Typography
              key={index}
              variant="body2"
              sx={{
                marginLeft: theme.spacing(1),
                fontSize: valueFontSize,
                marginTop: isModal ? theme.spacing(0.5) : "0px",
              }}
            >
              <a
                href={link.startsWith("http") ? link : `http://${link}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link}
              </a>
            </Typography>
          ))}
        </Grid>
      );
    } else {
      value = value.join(", ");
    }
  }

  if (type === "link" && value && value !== "Non disponible") {
    return (
      <Grid item xs={12} sm={6}>
        <FieldTitle variant={titleVariant} isModal={isModal}>
          {title}:
        </FieldTitle>
        <Divider sx={{ marginBottom: theme.spacing(1) }} />
        <Typography
          variant="body2"
          sx={{
            marginLeft: theme.spacing(1),
            fontSize: valueFontSize,
            marginTop: isModal ? theme.spacing(0.5) : "0px",
          }}
        >
          <a
            href={value.startsWith("http") ? value : `http://${value}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {value}
          </a>
        </Typography>
      </Grid>
    );
  }

  return (
    <Grid item xs={12} sx={isHistoire ? { width: "100%" } : {}}>
      <FieldTitle variant={titleVariant} isModal={isModal}>
        {title}:
      </FieldTitle>
      <Divider sx={{ marginBottom: theme.spacing(1) }} />
      <Typography
        variant="body1"
        sx={{
          marginLeft: theme.spacing(1),
          fontSize: valueFontSize,
        }}
      >
        {value}
      </Typography>
    </Grid>
  );
};

Field.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.any,
  type: PropTypes.string,
  isModal: PropTypes.bool,
  fontSize: PropTypes.string,
};

Field.defaultProps = {
  type: "text",
  isModal: false,
};

const TabPanelContent = ({ fields, isModal, fontSize }) => {
  const theme = useTheme();
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Grid
        container
        spacing={2}
        sx={{
          flex: 1,
          overflowY: "auto",
          border: "none",
          paddingLeft: theme.spacing(2),
          paddingTop: theme.spacing(4),
        }}
      >
        {fields.map((field) => (
          <Field
            key={field.title}
            {...field}
            isModal={isModal}
            fontSize={fontSize}
          />
        ))}
      </Grid>
    </div>
  );
};

TabPanelContent.propTypes = {
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      value: PropTypes.any,
      type: PropTypes.string,
    })
  ).isRequired,
  isModal: PropTypes.bool,
  fontSize: PropTypes.string,
};

TabPanelContent.defaultProps = {
  isModal: false,
  fontSize: "1rem",
};

export default TabPanelContent;
