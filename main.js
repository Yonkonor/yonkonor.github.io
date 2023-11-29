document.addEventListener('DOMContentLoaded', function() {
    // Obtener elementos del DOM
    const playButton = document.getElementById('playButton');
    const frequencySlider = document.getElementById('frequencySlider');
    const frequencyValue = document.getElementById('frequencyValue');
    const accelerationValue = document.getElementById('accelerationValue');

    // Inicializar el contexto de audio
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    oscillator.type = 'sine'; // Puedes cambiar el tipo de onda según tus preferencias

    // Inicializar el acelerómetro
    if (window.DeviceMotionEvent) {
        window.addEventListener('devicemotion', handleMotion);
    } else {
        accelerationValue.textContent = 'El acelerómetro no está soportado en este dispositivo.';
    }

    // Evento para reproducir el sonido
    playButton.addEventListener('click', function() {
        if (audioContext.state === 'suspended') {
            audioContext.resume();
        }

        oscillator.frequency.setValueAtTime(frequencySlider.value, audioContext.currentTime);
        oscillator.connect(audioContext.destination);
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.5); // Detener después de 0.5 segundos
    });

    // Evento para actualizar la frecuencia al deslizar el control deslizante
    frequencySlider.addEventListener('input', function() {
        frequencyValue.textContent = frequencySlider.value + ' Hz';
    });

    // Función para manejar los datos del acelerómetro
    function handleMotion(event) {
        const acceleration = event.accelerationIncludingGravity;
        const intensity = Math.sqrt(acceleration.x ** 2 + acceleration.y ** 2 + acceleration.z ** 2);

        accelerationValue.textContent = `Intensidad: ${intensity.toFixed(2)}`;
    }
});
