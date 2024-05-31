import { Button } from "@/components/HTMLDefault/Button";
import { useAuthContext } from "@/context/auth-context";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import styles from "./styles.module.css";

type Sections = "profile" | "orders";

interface ScreenWithOptionsProps {
  options: {
    sectionName: string;
    sectionIcon: JSX.Element;
    sectionComponent: JSX.Element;
    sectionUrl: string;
  }[];
  defaultUrl: string;
  defaultSection?: string;
}

export const ScreenWithOptions = ({
  options,
  defaultSection,
  defaultUrl,
}: ScreenWithOptionsProps) => {
  const { user } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();

  const [section, setSection] = useState<Sections>();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    if (searchParams.has("section")) {
      const section = searchParams.get("section") as Sections;
      if (!options.find((option) => option.sectionName === section))
        navigate(`${defaultUrl}?section=${options[0]?.sectionName || ""}`);
      else setSection(section);
    } else
      navigate(
        `${defaultUrl}?section=${
          defaultSection || options[0]?.sectionName || ""
        }`
      );
  }, [location]);

  const sectionComponent = useMemo(() => {
    if (!user) return;

    return options.find((option) => option.sectionName === section)
      ?.sectionComponent;
  }, [user, section]);

  return (
    <main className={styles.main}>
      <div className={styles.div}>
        <aside>
          {options.map((option) => (
            <Button
              divStyle={{
                justifyContent: "start",
                paddingLeft: 12,
                gap: 8,
                fontSize: 18,
              }}
              onClick={() =>
                navigate(`${defaultUrl}?section=${option.sectionName}`)
              }
              btnType={section === option.sectionName ? "primary" : "secondary"}
            >
              {option.sectionIcon}
              {option.sectionName}
            </Button>
          ))}
        </aside>

        <section className={styles.section}>{sectionComponent}</section>
      </div>
    </main>
  );
};
