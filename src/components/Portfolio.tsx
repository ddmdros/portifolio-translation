import { FormattedMessage } from "react-intl";
import MailButton from "./MailButton";
import { IconButton } from "./IconButton";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { PROFILE_CONFIG } from "../config/profile";

const Portfolio = () => {
  return (
    <div className="group relative flex flex-col md:flex-row items-center gap-10 bg-card-bg/50 backdrop-blur-sm border border-white/10 p-10 rounded-3xl overflow-hidden hover:border-white/20 transition-all duration-300">
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-accent/10 blur-[100px] rounded-full" />

      <div className="shrink-0 rounded-full">
        <img
          src={`${PROFILE_CONFIG.githubUrl}.png`}
          alt={PROFILE_CONFIG.name}
          className="rounded-full w-40 h-40 object-cover border-4 border-card-bg"
        />
      </div>

      <div className="flex-1 space-y-4">
        <span className="inline-block px-3 py-1 rounded-full bg-white/5 text-[10px] uppercase tracking-widest text-text-h font-semibold">
          <FormattedMessage id="portifolio.title" defaultMessage="Portfolio" />
        </span>

        <div className="space-y-1">
          <h3 className="text-4xl font-bold text-text-h tracking-tight">
            <FormattedMessage
              id="portifolio.name"
              defaultMessage={PROFILE_CONFIG.name}
            />
          </h3>
          <p className="text-text-h font-medium text-lg">
            <FormattedMessage
              id="portifolio.job-title"
              defaultMessage="Brazilian Portuguese Linguist (EN > PTBR)"
            />
          </p>
        </div>

        <p className="text-gray-400 leading-relaxed max-w-xl">
          <FormattedMessage
            id="portifolio.description"
            defaultMessage="Brazilian Portuguese linguist. Sensitivity reader for gender and sexualities matters. Enthusiast of comic books, fantasy literature, and poetic prose."
          />
        </p>

        <div className="flex items-center gap-3 pt-2">
          <MailButton />
          <IconButton
            icon={<FaGithub size={20} />}
            url={PROFILE_CONFIG.githubUrl}
          />
          <IconButton
            icon={<FaLinkedinIn size={20} />}
            url={PROFILE_CONFIG.linkedinUrl}
          />
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
