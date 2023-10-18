import { ReactNode } from "react";

interface PageTemplateProps {
  title: string;
  children: ReactNode;
}

const PageTemplate: React.FC<PageTemplateProps> = ({ title, children }) => {
  return (
    <>
      <div className="flex flex-col h-auto px-12">
        {title && (
          <>
            <h1 className="text-xl md:text-5xl py-4 font-work-sans px-8">
              {title}
            </h1>
            <hr className="py-2 " />
          </>
        )}
        <div className="px-8">{children}</div>
      </div>
    </>
  );
};

export default PageTemplate;
