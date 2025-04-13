import { useState, useEffect } from 'react';  

const useCounter = (target) => {
        const [count, setCount] = useState(0);

        useEffect(() => {
            const intervalTime = 25;
            const duration = 1500;
            const steps = Math.ceil(duration / intervalTime);
            const stepSize = target / steps;

            const interval = setInterval(() => {
                setCount((prev) => (prev + stepSize >= target ? target : prev + stepSize));
            }, intervalTime);

            return () => clearInterval(interval);
        }, [target]);

        return count;
    };

export default useCounter;