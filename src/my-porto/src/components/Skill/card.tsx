import React from "react";

type Tool = {
  name: string;
  icon: React.ReactElement;
};

type ToolsCardProps = {
  title: string;
  color: string;
  tools: Tool[];
};

const ToolsCard: React.FC<ToolsCardProps> = ({ title, color, tools }) => {
  return React.createElement(
    "div",
    { className: "bg-white shadow-md rounded-xl p-6 w-full max-w-xs" },
    [
      React.createElement(
        "h3",
        {
          key: "title",
          className: `text-lg font-semibold mb-4 text-${color}-600`,
        },
        title
      ),
      React.createElement(
        "div",
        { key: "tools", className: "flex flex-wrap gap-3" },
        tools.map((tool) =>
          React.createElement(
            "div",
            {
              key: `${title}-${tool.name}`,
              className:
                "flex items-center gap-2 border rounded-full px-3 py-1 text-sm hover:shadow transition bg-[#EFE4D2] text-gray-600",
            },
            React.createElement("span", {}, tool.icon, " ", tool.name)
          )
        )
      ),
    ]
  );
};

export default ToolsCard;
