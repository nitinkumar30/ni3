
import { GithubIcon, LinkedinIcon, TwitterIcon, InstagramIcon } from "@/components/ui/social-icons";
import { portfolioData } from "@/lib/portfolio-data";

const social = portfolioData.social_links;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/10 bg-[#050816] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00E5FF]/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#7B61FF]/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="text-center md:text-left">
            <p className="text-white/40 text-sm">
              &copy; {year} All rights reserved.
            </p>
          </div>

          <div className="text-center">
            <p className="text-white/60 text-sm">
              Made with{" "}
              <span className="text-red-400 animate-pulse inline-block">♥</span> by{" "}
              <a
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#00E5FF] hover:text-[#7B61FF] transition-colors duration-300 font-medium"
              >
                Nitin
              </a>
            </p>
          </div>

          <div className="flex items-center justify-center md:justify-end gap-4">
            {[
              { icon: GithubIcon, href: social.github, label: "GitHub" },
              { icon: LinkedinIcon, href: social.linkedin, label: "LinkedIn" },
              { icon: TwitterIcon, href: social.twitter, label: "Twitter" },
              { icon: InstagramIcon, href: social.instagram, label: "Instagram" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="p-2 text-white/40 hover:text-[#00E5FF] hover:bg-white/5 rounded-lg transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_8px_#00E5FF]"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

