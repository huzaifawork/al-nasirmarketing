"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, animate } from "framer-motion";
import {
  Target,
  Eye,
  Shield,
  Lightbulb,
  Building,
  MapPin,
  Star,
} from "lucide-react";
import SplitText from "./SplitText";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";

const mapCities = [
  { name: "Abbottabad", coordinates: [73.2117, 34.1463], isHQ: true },
  { name: "Haripur", coordinates: [72.9304, 33.9946] },
  { name: "Havelian", coordinates: [73.1114, 34.0533] },
  { name: "Rawalakot", coordinates: [73.7431, 33.8569] },
  { name: "Balakot", coordinates: [73.3496, 34.5422] },
  { name: "Mansehra", coordinates: [73.197, 34.3313] },
  { name: "Shinkiari", coordinates: [73.2721, 34.4719] },
  { name: "Battagram", coordinates: [73.0263, 34.6796] },
  { name: "Oghi", coordinates: [73.0118, 34.5053] },
  { name: "Naran", coordinates: [73.6508, 34.908] },
  { name: "Kaghan", coordinates: [73.5244, 34.7731] },
  { name: "Attock", coordinates: [72.3667, 33.7645] },
  { name: "Peshawar", coordinates: [71.5249, 34.0151] },
  { name: "Nowshera", coordinates: [71.9882, 34.0105] },
  { name: "Mirpur AJK", coordinates: [73.7422, 33.1428] },
  { name: "Chakswari", coordinates: [73.7749, 33.2201] },
  { name: "Islamgarh AJK", coordinates: [73.7915, 33.1672] },
  { name: "Kotli", coordinates: [73.9019, 33.5156] },
  { name: "Bagh AJK", coordinates: [73.7915, 33.9733] },
  { name: "Muzaffarabad", coordinates: [73.4711, 34.3597] },
  { name: "Mingora", coordinates: [72.3602, 34.7717] },
  { name: "Dera Ismail Khan", coordinates: [70.9024, 31.8328] },
  { name: "Charsadda", coordinates: [71.735, 34.1509] },
  { name: "Mardan", coordinates: [72.0441, 34.1958] },
  { name: "Karak", coordinates: [71.0933, 33.1166] },
  { name: "Bannu", coordinates: [70.6042, 32.9861] },
  { name: "Chakwal", coordinates: [72.854, 32.9327] },
  { name: "Timergara", coordinates: [71.8408, 34.8281] },
  { name: "Dir", coordinates: [71.8749, 35.1977] },
  { name: "Gilgit", coordinates: [74.3083, 35.9208] },
];

const aboutTabs = [
  {
    id: "company",
    title: "Our Company",
    icon: Building,
    content:
      "Al-Nasir Advertising positioned itself in Outdoor Advertising, Billboards and Inkjet Printing business in 1994. Today, we are investing in scalable and flexible N.G.P (Next Generation Promotion) solutions — providing cost-effective and future-proof investments. This means lower fixed capital expenditure, more efficient structures, lower operating costs, better quality of service, more competitive products, and quick-to-market revenue-rich services.",
  },
  {
    id: "vision",
    title: "Our Vision",
    icon: Eye,
    content:
      "To become the number one publicity provider and a leading National & International advertising and multi-services operator — creating a true regional publicity footprint that spans borders and defines markets.",
  },
  {
    id: "mission",
    title: "Our Mission",
    icon: Target,
    content:
      "To become the preferred quality publicity provider in the country. To be commercially successful while emerging as a responsible marketing institution that fulfills its social responsibilities — and to ensure maximum employee satisfaction at every level.",
  },
  {
    id: "philosophy",
    title: "Our Philosophy",
    icon: Lightbulb,
    content:
      "We are built on five unshakeable pillars: Honesty, Integrity, delivering Work on Time, uncompromising Quality, and Fair Dealing. These are not just values — they are the standard we hold ourselves to on every campaign, every placement, and every client relationship.",
  },
  {
    id: "policy",
    title: "Our Policy",
    icon: Shield,
    content:
      "We show respect for all individuals. The interests of the company, our clients, and the individual are inseparable. We are strategically focused, externally driven, and innovation is the cornerstone of our success. In everything we do, we seek to be the best.",
  },
];

function Counter({
  from,
  to,
  suffix,
}: {
  from: number;
  to: number;
  suffix: string;
}) {
  const [count, setCount] = useState(from);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (inView) {
      const controls = animate(from, to, {
        duration: 2.5,
        ease: "easeOut",
        onUpdate(value) {
          setCount(Math.round(value));
        },
      });
      return controls.stop;
    }
  }, [from, inView, to]);

  return (
    <motion.span
      onViewportEnter={() => setInView(true)}
      viewport={{ once: true }}
      className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 drop-shadow-xl"
    >
      {count}
      {suffix}
    </motion.span>
  );
}

export default function AboutUs() {
  const [position, setPosition] = useState({
    coordinates: [72, 33.5],
    zoom: 1,
  });

  const handleZoomIn = () => {
    if (position.zoom >= 4) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom * 1.5 }));
  };

  const handleZoomOut = () => {
    if (position.zoom <= 1) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom / 1.5 }));
  };

  const handleMoveEnd = (position: {
    coordinates: [number, number];
    zoom: number;
  }) => {
    setPosition(position);
  };

  return (
    <section
      id="about"
      className="relative py-16 md:py-32 bg-[#0a1120] overflow-hidden border-t border-white/5"
    >
      {/* Premium Gradient Overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-[#1B2A4A]/40 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#38BDF8]/10 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        {/* ROW 1: Big Map (left) + Heritage Heading & Our Company (right) */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-stretch">
          {/* LEFT: Custom Interactive Map Using React-Simple-Maps */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.2 }}
            className="w-full lg:w-[35%] relative min-h-[380px] md:min-h-[500px] bg-gradient-to-br from-[#111c33] to-[#0a1120] rounded-[2rem] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden flex items-center justify-center p-4 md:p-8"
          >
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#38BDF8]/5 via-transparent to-transparent pointer-events-none" />

            {/* Map Legend / Key & Zoom Controls */}
            <div className="absolute top-8 right-8 z-20 flex flex-col gap-4">
              <div className="bg-[#0a1120]/80 backdrop-blur-md border border-white/10 px-5 py-4 rounded-2xl pointer-events-none shadow-2xl flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <Star
                    size={18}
                    color="#ffb400"
                    fill="#ffb400"
                    className="drop-shadow-[0_0_10px_rgba(255,180,0,0.6)]"
                  />
                  <span className="text-white text-[10px] font-black uppercase tracking-widest leading-none">
                    Head Office
                  </span>
                </div>
                <div className="flex items-center gap-3 pl-1">
                  <div className="w-3 h-3 rounded-full bg-[#38BDF8] shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
                  <span className="text-white text-[10px] font-black uppercase tracking-widest leading-none">
                    Locations
                  </span>
                </div>
              </div>

              {/* Zoom Controls */}
              <div className="flex gap-2 self-end">
                <button
                  onClick={handleZoomIn}
                  className="w-10 h-10 bg-[#0a1120]/80 hover:bg-[#38BDF8] backdrop-blur-md border border-white/10 flex items-center justify-center rounded-xl text-white font-black text-lg transition-colors"
                  title="Zoom In"
                >
                  +
                </button>
                <button
                  onClick={handleZoomOut}
                  className="w-10 h-10 bg-[#0a1120]/80 hover:bg-[#38BDF8] backdrop-blur-md border border-white/10 flex items-center justify-center rounded-xl text-white font-black text-lg transition-colors"
                  title="Zoom Out"
                >
                  -
                </button>
              </div>
            </div>

            {/* React Simple Maps Container */}
            <div className="relative w-full h-full min-h-[450px]">
              <ComposableMap
                projection="geoMercator"
                projectionConfig={{
                  scale: 3600,
                  center: [72, 33.5], // Focused heavily on Northern/Central Pakistan where the network is
                }}
                className="w-full h-full absolute inset-0"
              >
                <ZoomableGroup
                  zoom={position.zoom}
                  center={position.coordinates as [number, number]}
                  onMoveEnd={handleMoveEnd}
                  maxZoom={4} // max zoom allowed
                >
                  <Geographies geography="/pakistan.topo.json">
                    {({ geographies }: { geographies: any[] }) =>
                      geographies.map((geo) => (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          fill="#0a1120"
                          stroke="#38BDF8"
                          strokeWidth={0.5}
                          strokeOpacity={0.5}
                          style={{
                            default: { fill: "#111c33", outline: "none" },
                            hover: { fill: "#1a2c47", outline: "none" },
                            pressed: { fill: "#1a2c47", outline: "none" },
                          }}
                        />
                      ))
                    }
                  </Geographies>

                  {[...mapCities]
                    .sort((a, b) => (a.isHQ ? 1 : -1))
                    .map((city, i) => (
                      <Marker
                        key={city.name}
                        coordinates={city.coordinates as [number, number]}
                      >
                        <motion.g
                          initial={{ scale: 0, opacity: 0 }}
                          whileInView={{ scale: 1, opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.2 + i * 0.03, type: "spring" }}
                          className="group cursor-pointer"
                        >
                          {city.isHQ ? (
                            <>
                              <circle
                                r={45}
                                fill="#ffb400"
                                fillOpacity={0.25}
                                className="animate-ping pointer-events-none"
                              />
                              <Star
                                size={44}
                                color="#ffb400"
                                fill="#ffb400"
                                x={-22}
                                y={-22}
                                className="pointer-events-none"
                              />
                              {/* Invisible hit area for reliable hover tightened to prevent overlapping neighbors */}
                              <circle
                                r={18}
                                fill="transparent"
                                className="cursor-pointer"
                              />
                            </>
                          ) : (
                            <>
                              <circle
                                r={15}
                                fill="#38BDF8"
                                fillOpacity={0.4}
                                className="animate-ping pointer-events-none"
                              />
                              <circle
                                r={6.5}
                                fill="#38BDF8"
                                className="pointer-events-none"
                              />
                              {/* Invisible hit area for reliable hover tightened */}
                              <circle
                                r={7}
                                fill="transparent"
                                className="cursor-pointer"
                              />
                            </>
                          )}

                          <text
                            textAnchor="middle"
                            y={-30}
                            style={{
                              fontFamily: "inherit",
                              fontSize: "32px",
                              fill: "white",
                              fontWeight: "900",
                              textTransform: "uppercase",
                              letterSpacing: "2px",
                              paintOrder: "stroke fill",
                              stroke: "#0a1120",
                              strokeWidth: 6,
                              strokeLinecap: "round",
                              strokeLinejoin: "round",
                            }}
                            className="opacity-0 group-hover:opacity-100 transition-all duration-300 drop-shadow-xl pointer-events-none"
                          >
                            {city.name}
                          </text>
                        </motion.g>
                      </Marker>
                    ))}
                </ZoomableGroup>
              </ComposableMap>
            </div>

            {/* Typography Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0a1120] via-[#0a1120]/90 to-transparent pt-32 pb-8 px-8 pointer-events-none z-10">
              <h3 className="text-white font-black text-xl uppercase tracking-widest text-shadow-sm">
                National Presence
              </h3>
              <p className="text-[#38BDF8] font-bold text-xs mt-2 tracking-[0.25em] uppercase">
                40+ Locations Across Pakistan
              </p>
            </div>
          </motion.div>

          {/* RIGHT: Heritage Heading + Our Company Text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
            className="w-full lg:w-[65%] flex flex-col justify-center mt-2 md:mt-0"
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="w-12 h-[2px] bg-[#38BDF8]" />
              <span className="text-[#38BDF8] text-sm font-black uppercase tracking-[0.4em] drop-shadow-[0_0_10px_rgba(56,189,248,0.5)]">
                Our Heritage
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.8rem] font-black text-white mb-6 md:mb-10 leading-[1.1] tracking-tight uppercase">
              <SplitText text="Pioneering Visual Dominance Since 1994." />
            </h2>

            {/* Our Company - Plain text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="border-l-2 border-[#38BDF8]/40 pl-6"
            >
              <div className="flex items-center gap-3 mb-3">
                <Building size={18} className="text-[#38BDF8]" />
                <h3 className="text-lg md:text-xl font-black text-white uppercase tracking-widest">
                  Our Company
                </h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed font-light">
                {aboutTabs[0].content}
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* ROW 2: Our Vision + Our Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
          {aboutTabs.slice(1, 3).map((tab, i) => {
            const Icon = tab.icon;
            return (
              <motion.div
                key={tab.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
                className="border-l-2 border-[#38BDF8]/40 pl-6"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Icon size={18} className="text-[#38BDF8]" />
                  <h3 className="text-lg md:text-xl font-black text-white uppercase tracking-widest">
                    {tab.title}
                  </h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed font-light">
                  {tab.content}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* ROW 3: Our Philosophy + Our Policy */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
          {aboutTabs.slice(3).map((tab, i) => {
            const Icon = tab.icon;
            return (
              <motion.div
                key={tab.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
                className="border-l-2 border-[#38BDF8]/40 pl-6"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Icon size={18} className="text-[#38BDF8]" />
                  <h3 className="text-lg md:text-xl font-black text-white uppercase tracking-widest">
                    {tab.title}
                  </h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed font-light">
                  {tab.content}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* ROW 4: Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-3 gap-4 md:gap-8 mt-12 md:mt-16 pt-8 md:pt-12 border-t border-white/10"
        >
          <div className="flex flex-col gap-2 items-center">
            <Counter from={0} to={30} suffix="+" />
            <span className="text-[9px] md:text-[10px] text-[#38BDF8] font-black uppercase tracking-[0.2em] text-center">
              Years Active
            </span>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <Counter from={0} to={15} suffix="+" />
            <span className="text-[9px] md:text-[10px] text-[#38BDF8] font-black uppercase tracking-[0.2em] text-center">
              Cities
            </span>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <Counter from={0} to={500} suffix="+" />
            <span className="text-[9px] md:text-[10px] text-[#38BDF8] font-black uppercase tracking-[0.2em] text-center">
              Campaigns
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
