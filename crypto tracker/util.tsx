import styled from "styled-components";

const Details = styled.details.attrs({ open: true })`
  margin: 1rem 0;
  padding: 0 1rem;
`;
const Summary = styled.summary`
  margin-left: -1rem;
  margin-bottom: 0.5rem;
  color: ${(props) => props.theme.accentColor};
`;
const Li = styled.li`
  margin: 0.5rem 0;
  padding: 0.5rem;
  background-color: ${(props) => props.theme.accentBgColor};
`;

export function ObjectToDetails({ obj }: { obj: any }) {
  //typeof null === "object"
  if (typeof obj === "object" && obj !== null) {
    if (Array.isArray(obj)) {
      return (
        <>
          {obj.map((value) => (
            <Li key={value}>{<ObjectToDetails obj={value} />}</Li>
          ))}
        </>
      );
    } else {
      return (
        <>
          {Object.entries(obj).map(([key, value]) => (
            <Details key={key}>
              <Summary>{key}</Summary>
              {typeof value === "object" ? (
                Array.isArray(value) ? (
                  <>
                    {value.map((val, i) => (
                      <Li key={i}>{<ObjectToDetails obj={val} />}</Li>
                    ))}
                  </>
                ) : (
                  <ObjectToDetails obj={value} />
                )
              ) : (
                <>{String(value)}</>
              )}
            </Details>
          ))}
        </>
      );
    }
  } else {
    return <>{String(obj)}</>;
  }
}
