
varying float vPosition;


void main() {

    vec3 fireColor = mix(vec3(1.0, 0.5, 0.0), vec3(1.0, 1.0, 0.0), vPosition);

    gl_FragColor = vec4(fireColor, 1.0);
}