import {Card, Row} from "@themesberg/react-bootstrap";
import React from "react";

const GenericSectionHeaderComponent = ({title, bgColor, titleColor, textSize}) => {
    return(
        <Card border="light"
              className="customSectionHeaderStyle shadow-xl mb-1 hidden-print"
              style={{backgroundColor: bgColor ? bgColor : '#047fb0'}}
        >
            <Card.Body>
                <>
                    {textSize &&
                        <>
                            {textSize === '6' &&
                                <h6 style={{color: titleColor ? titleColor : "#fefefe"}}>
                                    {title}
                                </h6>
                            }
                            {textSize === '5' &&
                                <h5 style={{color: titleColor ? titleColor : "#fefefe"}}>
                                    {title}
                                </h5>
                            }
                            {textSize === '4' &&
                                <h4 style={{color: titleColor ? titleColor : "#fefefe"}}>
                                    {title}
                                </h4>
                            }
                            {textSize === '3' &&
                                <h3 style={{color: titleColor ? titleColor : "#fefefe"}}>
                                    {title}
                                </h3>
                            }
                            {textSize === '2' &&
                                <h2 style={{color: titleColor ? titleColor : "#fefefe"}}>
                                    {title}
                                </h2>
                            }
                            {textSize === '1' &&
                                <h1 style={{color: titleColor ? titleColor : "#fefefe"}}>
                                    {title}
                                </h1>
                            }
                        </>}
                    {!textSize &&
                        <>
                            <h6 style={{color: titleColor ? titleColor : "#fefefe"}}>
                                {title}
                            </h6>
                        </>}
                </>
            </Card.Body>
        </Card>
    )
};

export default GenericSectionHeaderComponent;