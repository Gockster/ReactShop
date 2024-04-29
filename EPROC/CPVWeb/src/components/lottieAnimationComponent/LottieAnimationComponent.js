import React from 'react';
import Lottie from 'react-lottie';

type Props = {
    animationHeight: number,
    animationWidth: number,
    animationSourceFile: string
}

class LottieAnimationComponent extends React.Component<Props>{
    render() {

        const {
            animationHeight,
            animationWidth,
            animationSourceFile
        } = this.props;

        const lottieAnimationDefaultOptions = {
            loop: true,
            autoplay: true,
            animationData: animationSourceFile,
            rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
            }
        };

        return (
            <Lottie options={lottieAnimationDefaultOptions}
                    height={animationHeight}
                    width={animationWidth}
            />
        )
    }
}

export default LottieAnimationComponent;