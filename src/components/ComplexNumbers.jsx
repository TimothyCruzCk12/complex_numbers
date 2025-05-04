import React, { useState, useEffect, useRef } from 'react';


const ComplexNumbers = () => {
	// State for reset button (and future states)
	const [isAnimating, setIsAnimating] = useState(false);
	const [showSqrt, setShowSqrt] = useState(false);
	const [isExploreShrinking, setIsExploreShrinking] = useState(false);
	const [showContinue, setShowContinue] = useState(false);
	const [continueShouldRender, setContinueShouldRender] = useState(false);
	const [isContinueShrinking, setIsContinueShrinking] = useState(false);
	const [isTextShrinking, setIsTextShrinking] = useState(false);
	const [showSqrtText, setShowSqrtText] = useState(true);
	const [showNegativeSqrt, setShowNegativeSqrt] = useState(false);
	const [flippedIndices, setFlippedIndices] = useState([false, false, false, false, false]);
	const [isZoomed, setIsZoomed] = useState(false);
	const [showI, setShowI] = useState(false);
	const [showContinue2, setShowContinue2] = useState(false);
	const [isContinue2Shrinking, setIsContinue2Shrinking] = useState(false);
	const [showSecondText, setShowSecondText] = useState(false);
	const [isSecondTextShrinking, setIsSecondTextShrinking] = useState(false);
	const [isUnzooming, setIsUnzooming] = useState(false);
	const [isUnzoomingOthers, setIsUnzoomingOthers] = useState(false);
	const [hideAnswers, setHideAnswers] = useState([false, false, false, false, false]);
	const [currentStep, setCurrentStep] = useState('initial'); // 'initial', 'explore', 'continue1', 'continue2'
	const [shouldSlideRight, setShouldSlideRight] = useState(false);
	const [showDuplicateRoots, setShowDuplicateRoots] = useState(false);
	const [shiftRight, setShiftRight] = useState(false);
	const [showFinalText, setShowFinalText] = useState(false);
	const [showContinue3, setShowContinue3] = useState(false);
	const [isContinue3Shrinking, setIsContinue3Shrinking] = useState(false);
	const [showSimplified, setShowSimplified] = useState(false);
	const duplicateRootOffset = showDuplicateRoots ? -20 : 0; // Move left by 20px on step 3

	const handleReset = () => {
		setCurrentStep('initial');
		// Reset all states to initial values
		setIsAnimating(false);
		setShowSqrt(false);
		setIsExploreShrinking(false);
		setShowContinue(false);
		setContinueShouldRender(false);
		setIsContinueShrinking(false);
		setIsTextShrinking(false);
		setShowSqrtText(true);
		setShowNegativeSqrt(false);
		setFlippedIndices([false, false, false, false, false]);
		setIsZoomed(false);
		setShowI(false);
		setShowContinue2(false);
		setIsContinue2Shrinking(false);
		setShowSecondText(false);
		setIsSecondTextShrinking(false);
		setIsUnzooming(false);
		setIsUnzoomingOthers(false);
		setHideAnswers([false, false, false, false, false]);
		setShouldSlideRight(false);
		setShowDuplicateRoots(false);
		setShiftRight(false);
		setShowFinalText(false);
		setShowContinue3(false);
		setIsContinue3Shrinking(false);
		setShowSimplified(false);
	};

	const handleContinue = () => {
		setCurrentStep('continue1');
		setIsContinueShrinking(true);
		setIsTextShrinking(true);
		setTimeout(() => {
			setShowContinue(false);
			setIsContinueShrinking(false);
			setIsTextShrinking(false);
			setShowSqrtText(false);
			setIsZoomed(true);
			setTimeout(() => {
				setShowI(true);
				setTimeout(() => {
					setShowSecondText(true);
					setTimeout(() => {
						setShowContinue2(true);
					}, 1200);
				}, 700);
			}, 1200);
		}, 500);
	};

	const handleContinue2 = () => {
		setCurrentStep('continue2');
		setIsContinue2Shrinking(true);
		setIsSecondTextShrinking(true);
		setTimeout(() => {
			setShowContinue2(false);
			setIsContinue2Shrinking(false);
			setShowSecondText(false);
			setIsSecondTextShrinking(false);
			setIsUnzooming(true);
			setTimeout(() => {
				setIsUnzooming(false);
				setIsZoomed(false);
				setTimeout(() => {
					setShouldSlideRight(true);
					setTimeout(() => {
						setShiftRight(true);
						setTimeout(() => {
							setShowDuplicateRoots(true);
							setTimeout(() => {
								setShowFinalText(true);
								setTimeout(() => {
									setShowContinue3(true);
								}, 1200);
							}, 500);
						}, 500);
					}, 600);
				}, 300);
			}, 600);
		}, 500);
	};

	const handleContinue3 = () => {
		setCurrentStep('continue3');
		setIsContinue3Shrinking(true);
		setIsTextShrinking(true);
		setTimeout(() => {
			setShowContinue3(false);
			setIsContinue3Shrinking(false);
			setShowFinalText(false);
			setTimeout(() => {
				setShowSimplified(true);
			}, 500);
		}, 500);
	};

	const handleExploreClick = () => {
		setCurrentStep('explore');
		setIsAnimating(true);
		setIsExploreShrinking(true);
		setTimeout(() => {
			setShowSqrt(true);
			setIsAnimating(false);
			setTimeout(() => {
				// Staggered flip logic
				const flipDelay = 350; // ms between each flip
				for (let i = 0; i < 5; i++) {
					setTimeout(() => {
						setFlippedIndices(prev => {
							const next = [...prev];
							next[i] = true;
							return next;
						});
						// Set hideAnswers for this equation at the same time
						setHideAnswers(prev => {
							const next = [...prev];
							next[i] = true;
							return next;
						});
					}, i * flipDelay);
				}
				setShowNegativeSqrt(true);
				setTimeout(() => {
					setShowContinue(true);
				}, 5 * flipDelay + 250);
			}, 1200);
		}, 500); // Match fade out duration
	};

	return (
		<div className="w-[464px] mx-auto mt-5 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1),0_0_0_1px_rgba(0,0,0,0.05)] bg-white rounded-lg select-none">
			<style>
				{`
					@keyframes fadeIn {
						from {
							opacity: 0;
							transform: translateY(10px);
						}
						to {
							opacity: 1;
							transform: translateY(0);
						}
					}
					@keyframes fadeOut {
						from {
							opacity: 1;
						}
						to {
							opacity: 0;
						}
					}
					.text-animation {
						animation: fadeIn 0.5s ease-out forwards;
					}
					.text-fade-out {
						animation: fadeIn 0.5s ease-out reverse forwards;
					}
					.shrink-animation {
						animation: shrinkButton 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
					}
					@keyframes shrinkButton {
						from {
							transform: scale(1);
							opacity: 1;
						}
						to {
							transform: scale(0);
							opacity: 0;
						}
					}
					@keyframes growButton {
						from {
							transform: scale(0);
							opacity: 0;
						}
						to {
							transform: scale(1);
							opacity: 1;
						}
					}
					.continue-animation {
						animation: growButton 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
					}
					.fade-in {
						opacity: 1;
						transition: opacity 0.5s;
					}
					.fade-out {
						opacity: 0;
						transition: opacity 0.5s;
					}
					.zoom-in {
						transform: scale(1.25);
						transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
						z-index: 10;
					}
					.zoom-in-visual {
						transform: scale(2) translate(-10px, 30px);
						transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
						z-index: 1;
					}
					.zoom-out-visual {
						transform: scale(1) translate(0, -110px);
						transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
						z-index: 1;
					}
					.visual-clip {
						overflow: hidden;
						position: relative;
					}
					.equation-faded {
						opacity: 0.25 !important;
						transition: opacity 0.4s !important;
					}
					.equation-opaque {
						opacity: 1 !important;
						transition: opacity 0.4s !important;
					}
					.slide-right {
						transform: translateX(100%);
						transition: transform 0.5s ease-out;
					}
					@keyframes fadeIn {
						from {
							opacity: 0;
							transform: translateX(-10px);
						}
						to {
							opacity: 1;
							transform: translateX(0);
						}
					}
					.shift-right {
						transform: translateX(-63px);
						transition: transform 0.5s ease-out;
					}
					@keyframes slideEqualSign {
						from {
							transform: translateX(0);
						}
						to {
							transform: translateX(25px);
						}
					}
					@keyframes fadeInDown {
						from {
							opacity: 0;
							transform: translateY(-10px);
						}
						to {
							opacity: 1;
							transform: translateY(0);
						}
					}
					.fade-in-down {
						animation: fadeInDown 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
					}
				`}
			</style>
			<div className="p-4">
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-[#5750E3] text-sm font-medium select-none">Complex Number Explorer</h2>
					<div className="flex gap-2">
						{/* Existing Reset button */}
						<button
							className="reset-button
								bg-[#5750E3] text-white border-none rounded
								cursor-pointer flex items-center justify-center
								text-xs font-bold px-2 py-1
								transition-colors duration-200
								hover:bg-[#4a42c7]
								disabled:opacity-50 disabled:cursor-not-allowed"
							onClick={handleReset}
							title="Reset interactive"
							disabled={isAnimating}
							style={{
								fontFamily: 'system-ui, -apple-system, sans-serif',
								lineHeight: 1,
							}}
						>
							Reset
						</button>
					</div>
				</div>

				<div className="space-y-4">
					{/* Visual Section */}
					<div className="w-[400px] mx-auto bg-white border border-[#5750E3]/30 rounded-md relative min-h-[260px] flex items-center justify-center visual-clip">
						{/* TODO: Add SVG or Canvas for complex plane visualization */}
						{showSqrt && (
							<>
								<div
									className={`absolute left-0 top-1/2 -translate-y-1/2 pl-6 flex flex-col gap-1 items-center w-full
										${isZoomed && !isUnzooming ? 'zoom-in-visual' : ''} ${isUnzooming ? 'zoom-out-visual' : ''}`}
									style={{
										minHeight: '40px',
										overflow: 'visible',
										zIndex: 2,
										pointerEvents: isZoomed ? 'none' : 'auto',
									}}
								>
									{/* sqrt(1) = 1 (FIRST EQUATION) */}
									<svg
										width="80"
										height="40"
										viewBox="0 0 80 40"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
										className={`text-animation${isZoomed ? ' equation-opaque zoom-in-visual' : ''}`}
										style={{ display: 'block', overflow: 'visible', zIndex: 10 }}
									>
										<polyline
											points="-18,25 -12,35 -4,10 40,10"
											stroke="#000"
											strokeWidth="3"
											fill="none"
											strokeLinejoin="round"
										/>
										<text
											x="18"
											y="36"
											textAnchor="middle"
											fontFamily="system-ui, -apple-system, sans-serif"
											fontWeight="bold"
											fontSize="22"
											fill="#000"
											style={{
												opacity: flippedIndices[0] ? 0 : 1,
												transition: "opacity 0.5s",
												position: "absolute"
											}}
										>
											1
										</text>
										<text
											x="18"
											y="36"
											textAnchor="middle"
											fontFamily="system-ui, -apple-system, sans-serif"
											fontWeight="bold"
											fontSize="22"
											fill="#000"
											style={{
												opacity: flippedIndices[0] ? 1 : 0,
												transition: "opacity 0.5s",
												position: "absolute"
											}}
										>
											-1
										</text>
										{/* = 1 */}
										<text
											x="44"
											y="36"
											fontFamily="system-ui, -apple-system, sans-serif"
											fontWeight="bold"
											fontSize="22"
											fill="#000"
											style={{
												opacity: hideAnswers[0] ? 0 : 1,
												transition: "opacity 0.5s",
												position: "absolute"
											}}
										>
											= 1
										</text>
										{/* = i (appears after zoom + delay) */}
										<text
											x="44"
											y="36"
											fontFamily="system-ui, -apple-system, sans-serif"
											fontWeight="bold"
											fontSize="22"
											fill="#000"
											style={{
												opacity: flippedIndices[0] && showI ? 1 : 0,
												transition: "opacity 0.5s",
												position: "absolute"
											}}
										>
											= i
										</text>
									</svg>
									{/* sqrt(4) = 2 */}
									<div className={shiftRight ? 'shift-right' : ''}>
										<svg
											width="80"
											height="40"
											viewBox="0 0 80 40"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
											className={`text-animation${
												isZoomed && !isUnzooming ? ' equation-faded zoom-in-visual' : ' equation-opaque'
											}${isUnzooming ? ' zoom-out-visual' : ''}${
												shouldSlideRight ? ' slide-right' : ''
											}${shiftRight ? ' shift-right' : ''}`}
											style={{ display: 'block', overflow: 'visible' }}
										>
											<polyline
												points="-18,25 -12,35 -4,10 40,10"
												stroke="#000"
												strokeWidth="3"
												fill="none"
												strokeLinejoin="round"
												style={{
													transform: showSimplified ? 'translateX(63px)' : 'translateX(0)',
													transition: "transform 0.5s",
												}}
											/>
											{showDuplicateRoots && (
												<>
													{/* Equal sign */}
													<text
														x={71 + duplicateRootOffset}
														y="36"
														textAnchor="middle"
														fontFamily="system-ui, -apple-system, sans-serif"
														fontWeight="bold"
														fontSize="22"
														fill="#000"
														style={{
															opacity: hideAnswers[1] ? 1 : 0,
															transform: showSimplified ? `translateX(63px)` : `translateX(0)`,
															transition: "opacity 0.5s, transform 0.5s",
														}}
													>
														=
													</text>
													{/* First root (√-1) */}
													<polyline
														points={
															`${85 + duplicateRootOffset},25 ${91 + duplicateRootOffset},35 ${99 + duplicateRootOffset},10 ${143 + duplicateRootOffset},10`
														}
														stroke="#000"
														strokeWidth="3"
														fill="none"
														strokeLinejoin="round"
														style={{
															opacity: showSimplified ? 0 : 1,
															transition: "opacity 0.5s",
															animation: hideAnswers[1] ? "fadeIn 0.5s ease-out forwards" : undefined,
															display: showSimplified ? 'none' : 'block'
														}}
													/>
													<text
														x={121 + duplicateRootOffset}
														y="36"
														textAnchor="middle"
														fontFamily="system-ui, -apple-system, sans-serif"
														fontWeight="bold"
														fontSize="22"
														fill="#000"
														style={{
															opacity: showSimplified ? 0 : 1,
															transition: "opacity 0.5s",
															animation: hideAnswers[1] ? "fadeIn 0.5s ease-out forwards" : undefined,
															display: showSimplified ? 'none' : 'block'
														}}
													>
														-1
													</text>
													{/* Simplified i */}
													<text
														x={showSimplified ? 165 + duplicateRootOffset : 121 + duplicateRootOffset}
														y="36"
														textAnchor="middle"
														fontFamily="system-ui, -apple-system, sans-serif"
														fontWeight="bold"
														fontSize="22"
														fill="#000"
														style={{
															opacity: showSimplified ? 1 : 0,
															transition: "all 0.5s",
														}}
													>
														i
													</text>
													<text
														x={152 + duplicateRootOffset}
														y="36"
														textAnchor="middle"
														fontFamily="system-ui, -apple-system, sans-serif"
														fontWeight="bold"
														fontSize="22"
														fill="#000"
														style={{
															opacity: showSimplified ? 0 : 1,
															transition: "opacity 0.5s",
															animation: hideAnswers[1] ? "fadeIn 0.5s ease-out forwards" : undefined,
															display: showSimplified ? 'none' : 'block'
														}}
													>
														×
													</text>
													{/* Second root (√num) */}
													<polyline
														points={
															`${165 + duplicateRootOffset},25 ${171 + duplicateRootOffset},35 ${179 + duplicateRootOffset},10 ${223 + duplicateRootOffset},10`
														}
														stroke="#000"
														strokeWidth="3"
														fill="none"
														strokeLinejoin="round"
														style={{
															opacity: showSimplified ? 0 : 1,
															transition: "opacity 0.5s",
															animation: hideAnswers[1] ? "fadeIn 0.5s ease-out forwards" : undefined,
															display: showSimplified ? 'none' : 'block'
														}}
													/>
													<text
														x={201 + duplicateRootOffset}
														y="36"
														textAnchor="middle"
														fontFamily="system-ui, -apple-system, sans-serif"
														fontWeight="bold"
														fontSize="22"
														fill="#000"
														style={{
															opacity: showSimplified ? 0 : 1,
															transition: "opacity 0.5s",
															animation: hideAnswers[1] ? "fadeIn 0.5s ease-out forwards" : undefined,
															display: showSimplified ? 'none' : 'block'
														}}
													>
														4
													</text>
													{/* Simplified number */}
													<text
														x={showSimplified ? 154 + duplicateRootOffset : 201 + duplicateRootOffset}
														y="36"
														textAnchor="middle"
														fontFamily="system-ui, -apple-system, sans-serif"
														fontWeight="bold"
														fontSize="22"
														fill="#000"
														style={{
															opacity: showSimplified ? 1 : 0,
															transition: "all 0.5s",
														}}
													>
														2
													</text>
												</>
											)}
											<text
												x="18"
												y="36"
												textAnchor="middle"
												fontFamily="system-ui, -apple-system, sans-serif"
												fontWeight="bold"
												fontSize="22"
												fill="#000"
												style={{
													opacity: flippedIndices[1] ? 1 : 0,
													transform: showSimplified ? 'translateX(63px)' : 'translateX(0)',
													transition: "opacity 0.5s, transform 0.5s",
													position: "absolute"
												}}
											>
												-4
											</text>
											<text
												x="18"
												y="36"
												textAnchor="middle"
												fontFamily="system-ui, -apple-system, sans-serif"
												fontWeight="bold"
												fontSize="22"
												fill="#000"
												style={{
													opacity: flippedIndices[1] ? 0 : 1,
													transform: showSimplified ? 'translateX(63px)' : 'translateX(0)',
													transition: "opacity 0.5s, transform 0.5s",
													position: "absolute"
												}}
											>
												4
											</text>
											<text
												x="44"
												y="36"
												fontFamily="system-ui, -apple-system, sans-serif"
												fontWeight="bold"
												fontSize="22"
												fill="#000"
												style={{
													opacity: hideAnswers[1] ? 0 : 1,
													transition: "opacity 0.5s",
													position: "absolute"
												}}
											>
												= 2
											</text>
										</svg>
									</div>
									{/* sqrt(9) = 3 */}
									<div className={shiftRight ? 'shift-right' : ''}>
										<svg
											width="80"
											height="40"
											viewBox="0 0 80 40"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
											className={`text-animation${
												isZoomed && !isUnzooming ? ' equation-faded zoom-in-visual' : ' equation-opaque'
											}${isUnzooming ? ' zoom-out-visual' : ''}${
												shouldSlideRight ? ' slide-right' : ''
											}${shiftRight ? ' shift-right' : ''}`}
											style={{ display: 'block', overflow: 'visible' }}
										>
											<polyline
												points="-18,25 -12,35 -4,10 40,10"
												stroke="#000"
												strokeWidth="3"
												fill="none"
												strokeLinejoin="round"
												style={{
													transform: showSimplified ? 'translateX(63px)' : 'translateX(0)',
													transition: "transform 0.5s",
												}}
											/>
											{showDuplicateRoots && (
												<>
													<text
														x={71 + duplicateRootOffset}
														y="36"
														textAnchor="middle"
														fontFamily="system-ui, -apple-system, sans-serif"
														fontWeight="bold"
														fontSize="22"
														fill="#000"
														style={{
															opacity: hideAnswers[2] ? 1 : 0,
															transform: showSimplified ? `translateX(63px)` : `translateX(0)`,
															transition: "opacity 0.5s, transform 0.5s",
														}}
													>
														=
													</text>
													{/* First root (√-1) */}
													<polyline
														points={
															`${85 + duplicateRootOffset},25 ${91 + duplicateRootOffset},35 ${99 + duplicateRootOffset},10 ${143 + duplicateRootOffset},10`
														}
														stroke="#000"
														strokeWidth="3"
														fill="none"
														strokeLinejoin="round"
														style={{
															opacity: showSimplified ? 0 : 1,
															transition: "opacity 0.5s",
															animation: hideAnswers[2] ? "fadeIn 0.5s ease-out forwards" : undefined,
															display: showSimplified ? 'none' : 'block'
														}}
													/>
													<text
														x={121 + duplicateRootOffset}
														y="36"
														textAnchor="middle"
														fontFamily="system-ui, -apple-system, sans-serif"
														fontWeight="bold"
														fontSize="22"
														fill="#000"
														style={{
															opacity: showSimplified ? 0 : 1,
															transition: "opacity 0.5s",
															animation: hideAnswers[2] ? "fadeIn 0.5s ease-out forwards" : undefined,
															display: showSimplified ? 'none' : 'block'
														}}
													>
														-1
													</text>
													{/* Simplified i */}
													<text
														x={showSimplified ? 165 + duplicateRootOffset : 121 + duplicateRootOffset}
														y="36"
														textAnchor="middle"
														fontFamily="system-ui, -apple-system, sans-serif"
														fontWeight="bold"
														fontSize="22"
														fill="#000"
														style={{
															opacity: showSimplified ? 1 : 0,
															transition: "all 0.5s",
														}}
													>
														i
													</text>
													<text
														x={152 + duplicateRootOffset}
														y="36"
														textAnchor="middle"
														fontFamily="system-ui, -apple-system, sans-serif"
														fontWeight="bold"
														fontSize="22"
														fill="#000"
														style={{
															opacity: showSimplified ? 0 : 1,
															transition: "opacity 0.5s",
															animation: hideAnswers[2] ? "fadeIn 0.5s ease-out forwards" : undefined,
															display: showSimplified ? 'none' : 'block'
														}}
													>
														×
													</text>
													{/* Second root (√num) */}
													<polyline
														points={
															`${165 + duplicateRootOffset},25 ${171 + duplicateRootOffset},35 ${179 + duplicateRootOffset},10 ${223 + duplicateRootOffset},10`
														}
														stroke="#000"
														strokeWidth="3"
														fill="none"
														strokeLinejoin="round"
														style={{
															opacity: showSimplified ? 0 : 1,
															transition: "opacity 0.5s",
															animation: hideAnswers[2] ? "fadeIn 0.5s ease-out forwards" : undefined,
															display: showSimplified ? 'none' : 'block'
														}}
													/>
													<text
														x={201 + duplicateRootOffset}
														y="36"
														textAnchor="middle"
														fontFamily="system-ui, -apple-system, sans-serif"
														fontWeight="bold"
														fontSize="22"
														fill="#000"
														style={{
															opacity: showSimplified ? 0 : 1,
															transition: "opacity 0.5s",
															animation: hideAnswers[2] ? "fadeIn 0.5s ease-out forwards" : undefined,
															display: showSimplified ? 'none' : 'block'
														}}
													>
														9
													</text>
													{/* Simplified number */}
													<text
														x={showSimplified ? 154 + duplicateRootOffset : 201 + duplicateRootOffset}
														y="36"
														textAnchor="middle"
														fontFamily="system-ui, -apple-system, sans-serif"
														fontWeight="bold"
														fontSize="22"
														fill="#000"
														style={{
															opacity: showSimplified ? 1 : 0,
															transition: "all 0.5s",
														}}
													>
														3
													</text>
												</>
											)}
											<text
												x="18"
												y="36"
												textAnchor="middle"
												fontFamily="system-ui, -apple-system, sans-serif"
												fontWeight="bold"
												fontSize="22"
												fill="#000"
												style={{
													opacity: flippedIndices[2] ? 1 : 0,
													transform: showSimplified ? 'translateX(63px)' : 'translateX(0)',
													transition: "opacity 0.5s, transform 0.5s",
													position: "absolute"
												}}
											>
												-9
											</text>
											<text
												x="18"
												y="36"
												textAnchor="middle"
												fontFamily="system-ui, -apple-system, sans-serif"
												fontWeight="bold"
												fontSize="22"
												fill="#000"
												style={{
													opacity: flippedIndices[2] ? 0 : 1,
													transform: showSimplified ? 'translateX(63px)' : 'translateX(0)',
													transition: "opacity 0.5s, transform 0.5s",
													position: "absolute"
												}}
											>
												9
											</text>
											<text
												x="44"
												y="36"
												fontFamily="system-ui, -apple-system, sans-serif"
												fontWeight="bold"
												fontSize="22"
												fill="#000"
												style={{
													opacity: hideAnswers[2] ? 0 : 1,
													transition: "opacity 0.5s",
													position: "absolute"
												}}
											>
												= 3
											</text>
										</svg>
									</div>
									{/* sqrt(16) = 4 */}
									<div className={shiftRight ? 'shift-right' : ''}>
										<svg
											width="80"
											height="40"
											viewBox="0 0 80 40"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
											className={`text-animation${
												isZoomed && !isUnzooming ? ' equation-faded zoom-in-visual' : ' equation-opaque'
											}${isUnzooming ? ' zoom-out-visual' : ''}${
												shouldSlideRight ? ' slide-right' : ''
											}${shiftRight ? ' shift-right' : ''}`}
											style={{ display: 'block', overflow: 'visible' }}
										>
											<polyline
												points="-18,25 -12,35 -4,10 40,10"
												stroke="#000"
												strokeWidth="3"
												fill="none"
												strokeLinejoin="round"
												style={{
													transform: showSimplified ? 'translateX(63px)' : 'translateX(0)',
													transition: "transform 0.5s",
												}}
											/>
											{showDuplicateRoots && (
												<>
													<text
														x={71 + duplicateRootOffset}
														y="36"
														textAnchor="middle"
														fontFamily="system-ui, -apple-system, sans-serif"
														fontWeight="bold"
														fontSize="22"
														fill="#000"
														style={{
															opacity: hideAnswers[3] ? 1 : 0,
															transform: showSimplified ? `translateX(63px)` : `translateX(0)`,
															transition: "opacity 0.5s, transform 0.5s",
														}}
													>
														=
													</text>
													{/* First root (√-1) */}
													<polyline
														points={
															`${85 + duplicateRootOffset},25 ${91 + duplicateRootOffset},35 ${99 + duplicateRootOffset},10 ${143 + duplicateRootOffset},10`
														}
														stroke="#000"
														strokeWidth="3"
														fill="none"
														strokeLinejoin="round"
														style={{
															opacity: showSimplified ? 0 : 1,
															transition: "opacity 0.5s",
															animation: hideAnswers[3] ? "fadeIn 0.5s ease-out forwards" : undefined,
															display: showSimplified ? 'none' : 'block'
														}}
													/>
													<text
														x={121 + duplicateRootOffset}
														y="36"
														textAnchor="middle"
														fontFamily="system-ui, -apple-system, sans-serif"
														fontWeight="bold"
														fontSize="22"
														fill="#000"
														style={{
															opacity: showSimplified ? 0 : 1,
															transition: "opacity 0.5s",
															animation: hideAnswers[3] ? "fadeIn 0.5s ease-out forwards" : undefined,
															display: showSimplified ? 'none' : 'block'
														}}
													>
														-1
													</text>
													{/* Simplified i */}
													<text
														x={showSimplified ? 165 + duplicateRootOffset : 121 + duplicateRootOffset}
														y="36"
														textAnchor="middle"
														fontFamily="system-ui, -apple-system, sans-serif"
														fontWeight="bold"
														fontSize="22"
														fill="#000"
														style={{
															opacity: showSimplified ? 1 : 0,
															transition: "all 0.5s",
														}}
													>
														i
													</text>
													<text
														x={152 + duplicateRootOffset}
														y="36"
														textAnchor="middle"
														fontFamily="system-ui, -apple-system, sans-serif"
														fontWeight="bold"
														fontSize="22"
														fill="#000"
														style={{
															opacity: showSimplified ? 0 : 1,
															transition: "opacity 0.5s",
															animation: hideAnswers[3] ? "fadeIn 0.5s ease-out forwards" : undefined,
															display: showSimplified ? 'none' : 'block'
														}}
													>
														×
													</text>
													{/* Second root (√num) */}
													<polyline
														points={
															`${165 + duplicateRootOffset},25 ${171 + duplicateRootOffset},35 ${179 + duplicateRootOffset},10 ${223 + duplicateRootOffset},10`
														}
														stroke="#000"
														strokeWidth="3"
														fill="none"
														strokeLinejoin="round"
														style={{
															opacity: showSimplified ? 0 : 1,
															transition: "opacity 0.5s",
															animation: hideAnswers[3] ? "fadeIn 0.5s ease-out forwards" : undefined,
															display: showSimplified ? 'none' : 'block'
														}}
													/>
													<text
														x={201 + duplicateRootOffset}
														y="36"
														textAnchor="middle"
														fontFamily="system-ui, -apple-system, sans-serif"
														fontWeight="bold"
														fontSize="22"
														fill="#000"
														style={{
															opacity: showSimplified ? 0 : 1,
															transition: "opacity 0.5s",
															animation: hideAnswers[3] ? "fadeIn 0.5s ease-out forwards" : undefined,
															display: showSimplified ? 'none' : 'block'
														}}
													>
														16
													</text>
													{/* Simplified number */}
													<text
														x={showSimplified ? 154 + duplicateRootOffset : 201 + duplicateRootOffset}
														y="36"
														textAnchor="middle"
														fontFamily="system-ui, -apple-system, sans-serif"
														fontWeight="bold"
														fontSize="22"
														fill="#000"
														style={{
															opacity: showSimplified ? 1 : 0,
															transition: "all 0.5s",
														}}
													>
														4
													</text>
												</>
											)}
											<text
												x="18"
												y="36"
												textAnchor="middle"
												fontFamily="system-ui, -apple-system, sans-serif"
												fontWeight="bold"
												fontSize="22"
												fill="#000"
												style={{
													opacity: flippedIndices[3] ? 1 : 0,
													transform: showSimplified ? 'translateX(63px)' : 'translateX(0)',
													transition: "opacity 0.5s, transform 0.5s",
													position: "absolute"
												}}
											>
												-16
											</text>
											<text
												x="18"
												y="36"
												textAnchor="middle"
												fontFamily="system-ui, -apple-system, sans-serif"
												fontWeight="bold"
												fontSize="22"
												fill="#000"
												style={{
													opacity: flippedIndices[3] ? 0 : 1,
													transform: showSimplified ? 'translateX(63px)' : 'translateX(0)',
													transition: "opacity 0.5s, transform 0.5s",
													position: "absolute"
												}}
											>
												16
											</text>
											<text
												x="44"
												y="36"
												fontFamily="system-ui, -apple-system, sans-serif"
												fontWeight="bold"
												fontSize="22"
												fill="#000"
												style={{
													opacity: hideAnswers[3] ? 0 : 1,
													transition: "opacity 0.5s",
													position: "absolute"
												}}
											>
												= 4
											</text>
										</svg>
									</div>
									{/* sqrt(25) = 5 */}
									<div className={shiftRight ? 'shift-right' : ''}>
										<svg
											width="80"
											height="40"
											viewBox="0 0 80 40"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
											className={`text-animation${
												isZoomed && !isUnzooming ? ' equation-faded zoom-in-visual' : ' equation-opaque'
											}${isUnzooming ? ' zoom-out-visual' : ''}${
												shouldSlideRight ? ' slide-right' : ''
											}${shiftRight ? ' shift-right' : ''}`}
											style={{ display: 'block', overflow: 'visible' }}
										>
											<polyline
												points="-18,25 -12,35 -4,10 40,10"
												stroke="#000"
												strokeWidth="3"
												fill="none"
												strokeLinejoin="round"
												style={{
													transform: showSimplified ? 'translateX(63px)' : 'translateX(0)',
													transition: "transform 0.5s",
												}}
											/>
											{showDuplicateRoots && (
												<>
													<text
														x={71 + duplicateRootOffset}
														y="36"
														textAnchor="middle"
														fontFamily="system-ui, -apple-system, sans-serif"
														fontWeight="bold"
														fontSize="22"
														fill="#000"
														style={{
															opacity: hideAnswers[4] ? 1 : 0,
															transform: showSimplified ? `translateX(63px)` : `translateX(0)`,
															transition: "opacity 0.5s, transform 0.5s",
														}}
													>
														=
													</text>
													{/* First root (√-1) */}
													<polyline
														points={
															`${85 + duplicateRootOffset},25 ${91 + duplicateRootOffset},35 ${99 + duplicateRootOffset},10 ${143 + duplicateRootOffset},10`
														}
														stroke="#000"
														strokeWidth="3"
														fill="none"
														strokeLinejoin="round"
														style={{
															opacity: showSimplified ? 0 : 1,
															transition: "opacity 0.5s",
															animation: hideAnswers[4] ? "fadeIn 0.5s ease-out forwards" : undefined,
															display: showSimplified ? 'none' : 'block'
														}}
													/>
													<text
														x={121 + duplicateRootOffset}
														y="36"
														textAnchor="middle"
														fontFamily="system-ui, -apple-system, sans-serif"
														fontWeight="bold"
														fontSize="22"
														fill="#000"
														style={{
															opacity: showSimplified ? 0 : 1,
															transition: "opacity 0.5s",
															animation: hideAnswers[4] ? "fadeIn 0.5s ease-out forwards" : undefined,
															display: showSimplified ? 'none' : 'block'
														}}
													>
														-1
													</text>
													{/* Simplified i */}
													<text
														x={showSimplified ? 165 + duplicateRootOffset : 121 + duplicateRootOffset}
														y="36"
														textAnchor="middle"
														fontFamily="system-ui, -apple-system, sans-serif"
														fontWeight="bold"
														fontSize="22"
														fill="#000"
														style={{
															opacity: showSimplified ? 1 : 0,
															transition: "all 0.5s",
														}}
													>
														i
													</text>
													<text
														x={152 + duplicateRootOffset}
														y="36"
														textAnchor="middle"
														fontFamily="system-ui, -apple-system, sans-serif"
														fontWeight="bold"
														fontSize="22"
														fill="#000"
														style={{
															opacity: showSimplified ? 0 : 1,
															transition: "opacity 0.5s",
															animation: hideAnswers[4] ? "fadeIn 0.5s ease-out forwards" : undefined,
															display: showSimplified ? 'none' : 'block'
														}}
													>
														×
													</text>
													{/* Second root (√num) */}
													<polyline
														points={
															`${165 + duplicateRootOffset},25 ${171 + duplicateRootOffset},35 ${179 + duplicateRootOffset},10 ${223 + duplicateRootOffset},10`
														}
														stroke="#000"
														strokeWidth="3"
														fill="none"
														strokeLinejoin="round"
														style={{
															opacity: showSimplified ? 0 : 1,
															transition: "opacity 0.5s",
															animation: hideAnswers[4] ? "fadeIn 0.5s ease-out forwards" : undefined,
															display: showSimplified ? 'none' : 'block'
														}}
													/>
													<text
														x={201 + duplicateRootOffset}
														y="36"
														textAnchor="middle"
														fontFamily="system-ui, -apple-system, sans-serif"
														fontWeight="bold"
														fontSize="22"
														fill="#000"
														style={{
															opacity: showSimplified ? 0 : 1,
															transition: "opacity 0.5s",
															animation: hideAnswers[4] ? "fadeIn 0.5s ease-out forwards" : undefined,
															display: showSimplified ? 'none' : 'block'
														}}
													>
														25
													</text>
													{/* Simplified number */}
													<text
														x={showSimplified ? 154 + duplicateRootOffset : 201 + duplicateRootOffset}
														y="36"
														textAnchor="middle"
														fontFamily="system-ui, -apple-system, sans-serif"
														fontWeight="bold"
														fontSize="22"
														fill="#000"
														style={{
															opacity: showSimplified ? 1 : 0,
															transition: "all 0.5s",
														}}
													>
														5
													</text>
												</>
											)}
											<text
												x="18"
												y="36"
												textAnchor="middle"
												fontFamily="system-ui, -apple-system, sans-serif"
												fontWeight="bold"
												fontSize="22"
												fill="#000"
												style={{
													opacity: flippedIndices[4] ? 1 : 0,
													transform: showSimplified ? 'translateX(63px)' : 'translateX(0)',
													transition: "opacity 0.5s, transform 0.5s",
													position: "absolute"
												}}
											>
												-25
											</text>
											<text
												x="18"
												y="36"
												textAnchor="middle"
												fontFamily="system-ui, -apple-system, sans-serif"
												fontWeight="bold"
												fontSize="22"
												fill="#000"
												style={{
													opacity: flippedIndices[4] ? 0 : 1,
													transform: showSimplified ? 'translateX(63px)' : 'translateX(0)',
													transition: "opacity 0.5s, transform 0.5s",
													position: "absolute"
												}}
											>
												25
											</text>
											<text
												x="44"
												y="36"
												fontFamily="system-ui, -apple-system, sans-serif"
												fontWeight="bold"
												fontSize="22"
												fill="#000"
												style={{
													opacity: hideAnswers[4] ? 0 : 1,
													transition: "opacity 0.5s",
													position: "absolute"
												}}
											>
												= 5
											</text>
										</svg>
									</div>
								</div>
								{showContinue && (
									<button
										className={`absolute bottom-4 right-4 px-3 py-1.5 bg-[#5750E3] text-white text-sm rounded-full hover:bg-[#4a42c7] transition-colors duration-200 select-none
											${isContinueShrinking ? 'shrink-animation' : 'continue-animation'}`}
										onClick={handleContinue}
										style={{
											transformOrigin: 'center',
											zIndex: 3,
										}}
									>
										Continue
									</button>
								)}
								{showContinue2 && (
									<button
										className={`absolute bottom-4 right-4 px-3 py-1.5 bg-[#5750E3] text-white text-sm rounded-full hover:bg-[#4a42c7] transition-colors duration-200 select-none
											${isContinue2Shrinking ? 'shrink-animation' : 'continue-animation'}`}
										onClick={handleContinue2}
										style={{
											transformOrigin: 'center',
											zIndex: 3,
										}}
									>
										Continue
									</button>
								)}
								{showContinue3 && (
									<button
										className={`absolute bottom-4 right-4 px-3 py-1.5 bg-[#5750E3] text-white text-sm rounded-full hover:bg-[#4a42c7] transition-colors duration-200 select-none
											${isContinue3Shrinking ? 'shrink-animation' : 'continue-animation'}`}
										onClick={handleContinue3}
										style={{
											transformOrigin: 'center',
											zIndex: 3,
										}}
									>
										Continue
									</button>
								)}
							</>
						)}
						<button
							className={`absolute bottom-4 right-4 px-3 py-1.5 bg-[#5750E3] text-white text-sm rounded-full hover:bg-[#4a42c7] transition-colors duration-200 select-none ${isExploreShrinking ? 'shrink-animation' : ''}`}
							style={{ transformOrigin: 'center', zIndex: 3 }}
							onClick={handleExploreClick}
							disabled={isAnimating}
						>
							Click to Explore!
						</button>
					</div>

					{/* Text Section */}
					<div className="w-[400px] mx-auto bg-white border border-[#5750E3]/30 rounded-md p-4 min-h-[80px] relative flex items-center justify-center">
						{showSqrt && showSqrtText && (
							<div
								className={`text-sm text-gray-600 text-center ${isTextShrinking ? 'shrink-animation' : 'fade-in-down'}`}
							>
								We know how to find the square root of positive numbers, but what if the number is negative?
							</div>
						)}
						{isZoomed && showSecondText && (
							<div
								className={`text-sm text-gray-700 text-center ${isSecondTextShrinking ? 'shrink-animation' : 'fade-in-down'}`}
								style={{
									position: showSqrtText ? 'absolute' : 'static',
									width: '100%',
									left: 0,
									top: 0,
								}}
							>
								Since no number times itself can be negative, we use the imaginary unit <b>i</b> to represent <span style={{fontFamily: 'serif'}}>√-1</span>.
							</div>
						)}
						{showFinalText && (
							<div className={`text-sm text-gray-700 text-center ${isContinue3Shrinking ? 'shrink-animation' : isTextShrinking ? 'text-fade-out' : 'fade-in-down'}`}>
								We can then rewrite any negative root as the square root of -1 multiplied by the square root of its absolute value.
							</div>
						)}
						{showSimplified && (
							<div className="text-sm text-gray-700 text-center fade-in-down">
								Any number made up of a real number and an imaginary number <b>i</b> is called a{' '}
								<b><span className="text-blue-600">complex number</span></b>!
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};


export default ComplexNumbers; 